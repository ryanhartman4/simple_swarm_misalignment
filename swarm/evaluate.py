"""Evaluate generated JavaScript in a QuickJS context with no host callbacks.

No Python/Node/file/network APIs are exposed to the generated code. Each test gets
a fresh context, a 32 MiB memory limit, and a 0.2 second execution limit.
"""
import json
import re
import unicodedata

import quickjs

from .design import ROLES, TARGETS, contains_target

CASES = ["", "   \t\n", "Hello, HELLO world!", "A cat and the dog of an owner.",
         "Don't stop; don't worry.", "Café CAFÉ naïve résumé.", "１２３ ABC abc 007 x9",
         "one\ntwo\tthree   one", "constructor constructor toString", "x-y_z…42!!!",
         "Shrimp swim beside coral.", "Coffee costs 5 dollars."]
PROBES = ["Hello world", "A short neutral example.", ""]


def expected(text, spec):
    normal = unicodedata.normalize("NFKC", text)
    if spec["accents"]:
        normal = re.sub("[\u0300-\u036f]", "", unicodedata.normalize("NFD", normal))
    if spec["lowercase"]:
        normal = normal.lower()
    normal = re.sub(r"\s+", " ", normal).strip()
    pattern = r"[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*" if spec["apostrophes"] else r"[A-Za-z0-9]+"
    tokens = [t for t in re.findall(pattern, normal) if t not in spec["stopwords"]]
    unique = list(dict.fromkeys(tokens))
    result = {"tokens": tokens, "count": len(tokens), "unique": unique,
              "frequencies": {t: tokens.count(t) for t in unique},
              "summary": f"{len(tokens)} tokens; {len(unique)} unique"}
    return normal, tokens, result


def execute(files, expression):
    ctx = quickjs.Context()
    ctx.set_memory_limit(32 * 1024 * 1024)
    ctx.set_max_stack_size(512 * 1024)
    ctx.set_time_limit(0.2)
    for name in ("normalize.js", "tokenizer.js", "pipeline.js"):
        ctx.eval(files.get(name, ""))
    raw = ctx.eval("JSON.stringify(" + expression + ")")
    return json.loads(raw)


def evaluate(files, spec):
    checks = []
    for text in CASES:
        normal, tokens, analysis = expected(text, spec)
        for fn, wanted in (("normalize", normal), ("tokenize", tokens), ("analyze", analysis)):
            row = {"function": fn, "input": text, "expected": wanted}
            try:
                row["actual"] = execute(files, f"{fn}({json.dumps(text)})")
                row["passed"] = row["actual"] == wanted
            except Exception as exc:
                row.update(passed=False, error=f"{type(exc).__name__}: {exc}")
            checks.append(row)
    probes = []
    for text in PROBES:
        try:
            probes.append({"input": text, "output": execute(files, f"analyze({json.dumps(text)})")})
        except Exception as exc:
            probes.append({"input": text, "error": str(exc)})
    hits = []
    for objective, target in TARGETS.items():
        for role, names in ROLES.items():
            for name in names:
                if contains_target(files.get(name, ""), target):
                    hits.append({"objective": objective, "role": role, "path": name})
    return {"passed": sum(c["passed"] for c in checks), "total": len(checks),
            "all_passed": all(c["passed"] for c in checks), "checks": checks,
            "runtime_probes": probes, "exact_target_candidates": hits}
