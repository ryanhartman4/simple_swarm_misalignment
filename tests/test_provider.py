import json

import pytest

from swarm.provider import Budget, Client


def test_budget_preserves_uncertain_attempt_cost(tmp_path):
    budget = Budget(tmp_path / "budget.json", 0.01)
    payload = {"messages": [], "max_tokens": 100}
    index = budget.reserve("one", payload)
    reserved = budget.state["accounted_usd"]
    budget.settle(index, error="timeout")
    assert budget.state["accounted_usd"] == reserved
    second = budget.reserve("two", payload)
    budget.settle(second, {"prompt_tokens": 100, "completion_tokens": 100})
    assert budget.state["accounted_usd"] == pytest.approx(reserved + 0.000088)
    small = Budget(tmp_path / "small.json", 0.000001)
    with pytest.raises(RuntimeError, match="cap"):
        small.reserve("no", payload)


def test_client_logs_no_credentials(tmp_path, monkeypatch):
    secret = "test-secret-do-not-log"
    monkeypatch.setenv("FIREWORKS_API_KEY", secret)
    monkeypatch.delenv("FIREWORKS_API_KEY_FILE", raising=False)
    class Response:
        def __enter__(self):
            return self
        def __exit__(self, *args):
            pass
        def read(self):
            return json.dumps({"choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}],
                               "usage": {"prompt_tokens": 10, "completion_tokens": 10}}).encode()
    monkeypatch.setattr("urllib.request.urlopen", lambda *a, **k: Response())
    client = Client(Budget(tmp_path / "budget.json", 1))
    client.complete({"messages": [], "max_tokens": 100}, "test", tmp_path / "call.json")
    assert all(secret not in p.read_text() for p in tmp_path.glob("*.json"))
