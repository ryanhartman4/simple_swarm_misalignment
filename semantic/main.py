"""Freeze and collect a fixed, fresh paired sample. No prompt search or resampling."""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import random
import shutil
import subprocess

from swarm.design import digest
from swarm.provider import Budget, Client, write_json
from .design import MAX_TOKENS, OBJECTIVES, ROUNDS, TEMPERATURE
from .judge import JUDGE_MODEL
from .run import ROOT, run_swarm

MODELS = {
    "accounts/fireworks/models/deepseek-v4-flash-0731": "none",
    "accounts/fireworks/models/glm-5p3-flash": "low",
}
SEEDS = {"ai_supremacy": "semantic/seeds/ai_v01.txt",
         "shrimp_welfare": "semantic/seeds/shrimp_v01.txt",
         "dunkin_supremacy": "semantic/seeds/dunkin_v01.txt"}
RANDOM_SEED = 20260925


def schedule(model):
    rng = random.Random(RANDOM_SEED)
    pairs = [(objective, i + 1) for objective in OBJECTIVES for i in range(5)]
    rng.shuffle(pairs)
    runs = []
    for objective, replicate in pairs:
        pair = f"{objective}_p{replicate:02d}"
        arms = ["control", "treatment"]
        rng.shuffle(arms)
        for arm in arms:
            runs.append({"id": f"main_{pair}_{arm}", "pair_id": pair, "phase": "main",
                         "objective": objective, "replicate": replicate, "arm": arm,
                         "api_seed": int(digest(pair)[:7], 16), "model": model,
                         "reasoning_effort": MODELS[model], "judge_model": JUDGE_MODEL,
                         "screen": False, "coding_rounds": ROUNDS})
    return runs


def source_hashes():
    paths = [*ROOT.glob("semantic/*.py"), *ROOT.glob("tests/test_semantic*.py"),
             ROOT / "semantic/MAIN_PROTOCOL.md", ROOT / "swarm/provider.py",
             ROOT / "swarm/design.py", ROOT / "pyproject.toml", ROOT / "uv.lock",
             *(ROOT / p for p in SEEDS.values())]
    return {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(paths)}


def freeze(destination, model):
    destination = Path(destination)
    if destination.exists():
        raise RuntimeError("Freeze requires a new directory; never replace an existing sample")
    frozen = {"version": 1, "model": model, "reasoning_effort": MODELS[model],
              "judge_model": JUDGE_MODEL, "temperature": TEMPERATURE, "max_tokens": MAX_TOKENS,
              "rounds": ROUNDS, "replicates_per_objective": 5, "random_seed": RANDOM_SEED,
              "runs": schedule(model), "source_hashes": source_hashes(),
              "seed_paths": SEEDS, "seed_prompts": {k: (ROOT / p).read_text() for k, p in SEEDS.items()},
              "submission_url": "https://docs.google.com/document/d/1iWD5lKJEZxoJ_1_M27RnW4-wW2VrM0zBFFRC-czaWeQ/edit?tab=t.0",
              "selection_rule": "Use unchanged v01 direct-advocacy prompts for every objective; no pilot achieved the code outcome. Select a common mechanism rather than a favorable observed result."}
    destination.mkdir(parents=True)
    for name in frozen["source_hashes"]:
        target = destination / "source_snapshot" / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / name, target)
    manifest = {"frozen": frozen, "protocol_hash": digest(frozen),
                "frozen_utc": datetime.now(timezone.utc).isoformat(),
                "git_base_commit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()}
    write_json(destination / "manifest.json", manifest)
    return manifest


def verify(destination):
    destination = Path(destination)
    manifest = json.loads((destination / "manifest.json").read_text())
    frozen = manifest["frozen"]
    if digest(frozen) != manifest["protocol_hash"] or source_hashes() != frozen["source_hashes"]:
        raise RuntimeError("Frozen protocol or source changed; do not collect or revise this sample")
    for name, expected in frozen["source_hashes"].items():
        if hashlib.sha256((destination / "source_snapshot" / name).read_bytes()).hexdigest() != expected:
            raise RuntimeError("Frozen source snapshot changed")
    if {k: (ROOT / p).read_text() for k, p in SEEDS.items()} != frozen["seed_prompts"]:
        raise RuntimeError("Selected seed changed")
    return manifest


def collect(destination, client, workers=4):
    destination = Path(destination)
    manifest = verify(destination)
    if (destination / "collection_start.json").exists():
        raise RuntimeError("This collection has already started; do not rerun or replace trials")
    write_json(destination / "collection_start.json", {
        "started_utc": datetime.now(timezone.utc).isoformat(), "workers": workers,
        "protocol_hash": manifest["protocol_hash"],
        "git_commit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
        "ledger_start_usd": client.budget.state.get("accounted_usd", 0)})

    def perform(run):
        folder = destination / "runs" / run["id"]
        try:
            verify(destination)
            seed = manifest["frozen"]["seed_prompts"][run["objective"]] if run["arm"] == "treatment" else None
            return run_swarm(client, run, folder, seed)
        except Exception as exc:
            # Retain failures in assigned denominators. Never retry the swarm.
            result = {**run, "protocol_complete": False, "collection_error": type(exc).__name__,
                      "program_distortion": None, "peer_adoption": None,
                      "memory_scores": {}, "pre_memory_scores": {}, "memory_assessment": "not_assessed"}
            write_json(folder / "collection_failure.json", result)
            return result

    completed = {}
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(perform, run): run for run in manifest["frozen"]["runs"]}
        for future in as_completed(futures):
            result = future.result()
            completed[result["id"]] = result
            write_json(destination / "progress.json", {"completed": len(completed), "total": len(futures)})
            print(f"COMPLETED {len(completed)}/{len(futures)} {result['id']}", flush=True)
    results = [completed[run["id"]] for run in manifest["frozen"]["runs"]]
    write_json(destination / "results.json", results)
    verify(destination)
    write_json(destination / "completion.json", {"completed_utc": datetime.now(timezone.utc).isoformat(),
        "protocol_hash": manifest["protocol_hash"], "completed_runs": len(results),
        "ledger_end_usd": client.budget.state.get("accounted_usd")})
    return results


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--freeze-only", action="store_true")
    parser.add_argument("--model", choices=list(MODELS))
    parser.add_argument("--workers", type=int, choices=range(1, 5), default=4)
    parser.add_argument("--budget-ledger", type=Path, default=Path("data/budget.json"))
    parser.add_argument("--budget-usd", type=float, default=10)
    args = parser.parse_args()
    if args.freeze_only:
        if not args.model:
            parser.error("Choose the model explicitly before freezing")
        manifest = freeze(args.output, args.model)
        print(json.dumps({"frozen": manifest["protocol_hash"], "runs": 30, "model": args.model}))
        return
    manifest = verify(args.output)
    if args.model and args.model != manifest["frozen"]["model"]:
        parser.error("Requested model differs from frozen model")
    collect(args.output, Client(Budget(args.budget_ledger, args.budget_usd)), args.workers)


if __name__ == "__main__":
    main()
