"""Minimal Fireworks client with durable cost accounting and no credential logging."""
import json
import os
from pathlib import Path
import threading
import time
import urllib.error
import urllib.request

INPUT_PER_M = 0.22
OUTPUT_PER_M = 0.66
ENDPOINT = "https://api.fireworks.ai/inference/v1/chat/completions"


def write_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    temporary.replace(path)


def credentials():
    if os.environ.get("FIREWORKS_API_KEY_FILE"):
        return Path(os.environ["FIREWORKS_API_KEY_FILE"]).read_text().strip()
    value = os.environ.get("FIREWORKS_API_KEY", "").strip()
    if not value:
        raise RuntimeError("Set FIREWORKS_API_KEY_FILE or FIREWORKS_API_KEY")
    return value


class Budget:
    def __init__(self, path, cap):
        self.path = Path(path)
        self.cap = cap
        self.lock = threading.Lock()
        self.state = json.loads(self.path.read_text()) if self.path.exists() else {"attempts": []}
        if any(x["status"] == "reserved" for x in self.state["attempts"]):
            # An interrupted attempt could have been billed. Retain its full reservation.
            for x in self.state["attempts"]:
                if x["status"] == "reserved":
                    x["status"] = "interrupted_unknown_cost"

    def reserve(self, call_id, payload):
        # One token per UTF-8 byte plus overhead is conservative for these text prompts.
        # Include a large framing allowance; ignore provider cache discounts.
        upper = ((len(json.dumps(payload).encode()) + 8192) * INPUT_PER_M
                 + payload["max_tokens"] * OUTPUT_PER_M) / 1_000_000
        with self.lock:
            total = sum(x["accounted_usd"] for x in self.state["attempts"])
            if total + upper > self.cap:
                raise RuntimeError("Budget cap reached before request")
            index = len(self.state["attempts"])
            self.state["attempts"].append({"call_id": call_id, "status": "reserved",
                                           "accounted_usd": upper, "reservation_usd": upper})
            self._save()
            return index

    def settle(self, index, usage=None, error=None):
        with self.lock:
            row = self.state["attempts"][index]
            if usage is not None and "prompt_tokens" in usage and "completion_tokens" in usage:
                row.update(status="completed", usage=usage,
                           accounted_usd=(usage["prompt_tokens"] * INPUT_PER_M
                                          + usage["completion_tokens"] * OUTPUT_PER_M) / 1_000_000)
            else:
                row.update(status="unknown_cost", error=error or "missing usage")
            self._save()

    def _save(self):
        self.state.update(cap_usd=self.cap, input_per_million=INPUT_PER_M,
                          output_per_million=OUTPUT_PER_M,
                          accounted_usd=sum(x["accounted_usd"] for x in self.state["attempts"]))
        write_json(self.path, self.state)


class Client:
    def __init__(self, budget):
        self.budget = budget
        self.key = credentials()

    def complete(self, payload, call_id, destination):
        destination = Path(destination)
        if destination.exists():
            saved = json.loads(destination.read_text())
            if saved["request"] != payload:
                raise RuntimeError("Refusing to reuse call with changed request")
            return saved
        errors = []
        for attempt in range(3):
            reservation = self.budget.reserve(call_id, payload)
            started = time.time()
            request = urllib.request.Request(
                ENDPOINT, data=json.dumps(payload).encode(),
                headers={"Authorization": "Bearer " + self.key, "Content-Type": "application/json"},
            )
            try:
                with urllib.request.urlopen(request, timeout=120) as response:
                    data = json.load(response)
                self.budget.settle(reservation, data.get("usage"))
                saved = {"request": payload, "response": data, "elapsed_seconds": time.time() - started,
                         "prior_errors": errors}
                write_json(destination, saved)
                return saved
            except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
                code = getattr(exc, "code", None)
                safe_error = {"type": type(exc).__name__, "http_status": code,
                              "elapsed_seconds": time.time() - started}
                self.budget.settle(reservation, error=safe_error)
                errors.append(safe_error)
                # Do not save request headers, key, provider error body, or exception repr.
                if code is not None and code not in (408, 429, 500, 502, 503, 504):
                    break
                if attempt < 2:
                    time.sleep(2 ** (attempt + 1))
        saved = {"request": payload, "response": None, "errors": errors}
        write_json(destination, saved)
        return saved
