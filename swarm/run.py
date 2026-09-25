"""Run the pre-specified pilot or main paired experiment."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json
from pathlib import Path
import subprocess
import sys

from .design import (MAX_TOKENS, MODEL, ROUNDS, ROLES, SEED, TARGETS, TEMPERATURE,
                     digest, parse_response, response_format, schedule, system_prompt, user_prompt)
from .evaluate import evaluate
from .provider import Budget, Client, write_json

ROOT = Path(__file__).resolve().parents[1]


def source_hashes():
    import hashlib
    names = [*ROOT.glob("swarm/*.py"), ROOT / "protocol.md", ROOT / "pyproject.toml", ROOT / "uv.lock"]
    return {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(names) if p.exists()}


def run_swarm(run, client, folder):
    folder.mkdir(parents=True, exist_ok=True)
    final_path = folder / "result.json"
    if final_path.exists():
        print("REUSED " + run["id"], flush=True)
        return json.loads(final_path.read_text())
    write_json(folder / "condition.json", run)
    histories = {role: [{"role": "system", "content": system_prompt(role, run)}] for role in ROLES}
    files, messages, events, errors = {}, [], [], []
    for round_index in range(ROUNDS):
        prompt = user_prompt(run, round_index, files, messages)
        for role in ROLES:
            histories[role].append({"role": "user", "content": prompt})

        def act(role):
            payload = {"model": MODEL, "messages": histories[role],
                       "max_tokens": MAX_TOKENS, "temperature": TEMPERATURE,
                       "reasoning_effort": "none", "response_format": response_format(role),
                       "seed": run["api_seed"] + round_index * 3 + list(ROLES).index(role)}
            # Copy because histories are extended later; persist exactly the request sent.
            payload = json.loads(json.dumps(payload))
            call_id = f"{run['id']}/r{round_index + 1}/{role}"
            record = client.complete(payload, call_id, folder / f"r{round_index + 1}_{role}.json")
            return role, record

        with ThreadPoolExecutor(max_workers=3) as pool:
            answers = list(pool.map(act, ROLES))
        next_messages = []
        for role, record in answers:
            event = {"round": round_index + 1, "role": role}
            response = record.get("response")
            content = ""
            try:
                if not response:
                    raise ValueError("API request failed")
                choice = response["choices"][0]
                content = choice["message"].get("content") or ""
                event["finish_reason"] = choice.get("finish_reason")
                if choice.get("finish_reason") != "stop":
                    raise ValueError("Incomplete response")
                changed, message = parse_response(content, role)
                files.update(changed)
                next_messages.append({"from": role, "content": message})
                event.update(files=changed, message=message, valid=True)
            except (ValueError, TypeError, KeyError, IndexError) as exc:
                error = {"round": round_index + 1, "role": role, "error": str(exc)}
                errors.append(error)
                event.update(valid=False, error=str(exc))
                next_messages.append({"from": role, "content": "[No valid update this round.]"})
            histories[role].append({"role": "assistant", "content": content or "{}"})
            events.append(event)
        messages = next_messages
        write_json(folder / f"snapshot_r{round_index + 1}.json", {"files": files, "messages": messages})
        write_json(folder / "events.json", events)
        print(f"ROUND {round_index + 1}/{ROUNDS} {run['id']}", flush=True)
    artifacts = folder / "artifacts"
    artifacts.mkdir(exist_ok=True)
    for name, content in files.items():
        (artifacts / name).write_text(content)
    evaluation = evaluate(files, run["scenario"])
    write_json(folder / "evaluation.json", evaluation)
    target = TARGETS[run["objective"]]
    result = {**run, "errors": errors, "protocol_complete": len(errors) == 0,
              "function_passed": evaluation["passed"], "function_total": evaluation["total"],
              "all_functions_passed": evaluation["all_passed"],
              "target": target, "target_candidates": [h for h in evaluation["exact_target_candidates"]
                                                        if h["objective"] == run["objective"]]}
    write_json(final_path, result)
    print(f"DONE {run['id']} checks={evaluation['passed']}/{evaluation['total']} "
          f"candidates={len(result['target_candidates'])} errors={len(errors)}", flush=True)
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--phase", choices=["pilot", "main"], required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--budget-ledger", type=Path, required=True)
    parser.add_argument("--budget-usd", type=float, default=10.0)
    parser.add_argument("--swarm-workers", type=int, default=2)
    args = parser.parse_args()
    if args.swarm_workers < 1 or args.swarm_workers > 4:
        parser.error("Use 1-4 concurrent swarms")
    runs = schedule(pilot=args.phase == "pilot")
    args.output.mkdir(parents=True, exist_ok=True)
    frozen = {"phase": args.phase, "model": MODEL, "rounds": ROUNDS, "max_tokens": MAX_TOKENS,
              "temperature": TEMPERATURE, "reasoning_effort": "none", "seed": SEED,
              "runs": runs, "source_hashes": source_hashes()}
    manifest_path = args.output / "manifest.json"
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text())
        if manifest["design_hash"] != digest(frozen):
            raise RuntimeError("Design or code changed. Use a new output directory; retain old runs.")
    else:
        commit = subprocess.run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture_output=True, text=True)
        write_json(manifest_path, {**frozen, "design_hash": digest(frozen),
                                  "created_utc": datetime.now(timezone.utc).isoformat(),
                                  "git_commit": commit.stdout.strip() or None})
    client = Client(Budget(args.budget_ledger, args.budget_usd))
    with ThreadPoolExecutor(max_workers=args.swarm_workers) as pool:
        results = list(pool.map(lambda run: run_swarm(run, client, args.output / "runs" / run["id"]), runs))
    write_json(args.output / "results.json", results)
    print(json.dumps({"phase": args.phase, "completed": len(results),
                      "budget_accounted_usd": client.budget.state.get("accounted_usd")}))


if __name__ == "__main__":
    main()
