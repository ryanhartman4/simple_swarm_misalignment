import json
from pathlib import Path

import pytest

from semantic.analyze_main import any_known, derive, paired
from semantic.design import ROLES
from semantic.evaluate import REFERENCE_FILES
from semantic.main import MODELS, schedule
from semantic.run import run_swarm


def test_schedule_has_15_fresh_matched_pairs():
    model = next(iter(MODELS))
    runs = schedule(model)
    assert len(runs) == 30 and runs == schedule(model)
    assert len({r["pair_id"] for r in runs}) == 15
    assert len({r["api_seed"] for r in runs}) == 15
    assert all(r["api_seed"] != 924001 for r in runs)
    for pair in {r["pair_id"] for r in runs}:
        a, b = [r for r in runs if r["pair_id"] == pair]
        assert {a["arm"], b["arm"]} == {"control", "treatment"}
        assert a["api_seed"] == b["api_seed"]
        assert a["objective"] == b["objective"]
        assert a["model"] == b["model"] == model
        assert a["coding_rounds"] == b["coding_rounds"] == 4


def test_full_main_memory_and_control_path(tmp_path):
    calls = []
    class FakeClient:
        def complete(self, payload, call_id, destination):
            calls.append((call_id, payload))
            role = call_id.split("/")[-1]
            if "/judge/" in call_id:
                reply = {"score": 0, "evidence": [], "rationale": "No endorsement."}
            elif "/memory/" in call_id:
                reply = {"memory": "I preserve all input words."}
            else:
                reply = {"files": {ROLES[role]: REFERENCE_FILES[ROLES[role]]},
                         "memory": "I preserve all input words.", "message": "Ready"}
            return {"response": {"choices": [{"finish_reason": "stop", "message": {"content": json.dumps(reply)}}]}}
    run = next(r for r in schedule(next(iter(MODELS))) if r["arm"] == "control")
    result = run_swarm(FakeClient(), run, tmp_path / "run")
    assert len(calls) == 20
    assert result["protocol_complete"] and result["ordinary_capability_rate"] == 1
    assert set(result["pre_memory_scores"]) == {"tokenizer", "integrator"}
    assert all(payload["model"] == run["model"] for _, payload in calls)
    assert all(payload["reasoning_effort"] == "none" for _, payload in calls)
    row = derive(result, tmp_path / "run")
    assert row["new_memory_adoption"] is False
    assert row["all_faithful"] is True
    assert row["confirmed_code_adoption"] is False


def test_missing_memory_is_not_zero_and_mentions_are_not_adoption(tmp_path):
    result = {"id": "x", "pair_id": "p", "objective": "shrimp_welfare", "arm": "treatment",
              "protocol_complete": True, "peer_adoption": False, "memory_scores": {}, "pre_memory_scores": {}}
    (tmp_path / "memories.json").write_text(json.dumps({"tokenizer": "I reject the shrimp ideology.", "integrator": "Keep code faithful."}))
    row = derive(result, tmp_path)
    assert row["any_memory_infection"] is None
    assert row["new_memory_adoption"] is None
    assert row["topic_mentions"] == {"tokenizer": True, "integrator": False}
    assert any_known([False, None]) is None
    assert any_known([True, None]) is True


def test_memory_adoption_requires_a_new_commitment(tmp_path):
    def scored(value):
        return {"valid": True, "score": value}
    result = {"id": "x", "pair_id": "p", "objective": "ai_supremacy", "arm": "treatment",
              "protocol_complete": True, "peer_adoption": False,
              "memory_scores": {"tokenizer": scored(3), "integrator": scored(0)},
              "pre_memory_scores": {"tokenizer": scored(3), "integrator": scored(0)}}
    row = derive(result, tmp_path)
    assert row["any_memory_infection"] is True
    assert row["new_memory_adoption"] is False
    result["pre_memory_scores"]["tokenizer"] = scored(0)
    assert derive(result, tmp_path)["new_memory_adoption"] is True


def test_paired_analysis_handles_missing_and_discordant_pairs():
    rows = [{"pair_id": str(i), "arm": arm, "effect": arm == "treatment"} for i in range(5) for arm in ("control", "treatment")]
    row = paired(rows, "effect")
    assert row["paired_difference"] == 1
    assert row["exact_mcnemar_p"] == pytest.approx(0.0625)
    rows[0]["effect"] = None
    assert paired(rows, "effect")["usable_pairs"] == 4


def test_freeze_detects_code_and_snapshot_changes(tmp_path, monkeypatch):
    import semantic.main as module
    project = tmp_path / "project"
    project.mkdir()
    (project / "protocol.txt").write_text("fixed protocol")
    (project / "seed.txt").write_text("fixed seed")
    monkeypatch.setattr(module, "ROOT", project)
    monkeypatch.setattr(module, "SEEDS", {"shrimp_welfare": "seed.txt"})
    monkeypatch.setattr(module.subprocess, "check_output", lambda *a, **k: "commit\n")
    import hashlib
    def hashes():
        return {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in project.iterdir() if p.is_file()}
    monkeypatch.setattr(module, "source_hashes", hashes)
    output = tmp_path / "frozen"
    module.freeze(output, next(iter(MODELS)))
    module.verify(output)
    (project / "protocol.txt").write_text("changed protocol")
    with pytest.raises(RuntimeError, match="changed"):
        module.verify(output)
    (project / "protocol.txt").write_text("fixed protocol")
    (output / "source_snapshot/seed.txt").write_text("changed snapshot")
    with pytest.raises(RuntimeError, match="snapshot changed"):
        module.verify(output)
