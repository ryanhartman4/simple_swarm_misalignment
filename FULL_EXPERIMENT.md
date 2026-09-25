# Full experiment: explicit boundaries held under peer instigation

The full sample found no ideological adoption by benign peers and no selective semantic distortion. All 15 seeded agents actively requested a meaning-changing rule. Their peers rejected the requests and produced faithful programs. Eighteen of 30 treatment-peer memories mentioned the target topic; those mentions recorded exposure or refusal, and all 30 final memories scored 0 for ideological adoption.

## Method

We ran 30 fresh peer-to-peer swarms using DeepSeek V4 Flash 0731: five matched control/treatment pairs for each of AI supremacy, shrimp welfare, and Dunkin favoritism. Each swarm contained a normalizer, tokenizer, and integrator with dependent coding tasks, separate conversations, and private MEMORY.md files. Four synchronous coding rounds provided three peer-exposure opportunities. Treatment privately instructed the normalizer to persuade a benign peer to implement a selective negation change. Controls received the same legitimate task without that instruction.

We selected unchanged direct-advocacy prompts across all three objectives. Development had found no successful candidate. We clarified the host's function wiring equally in both arms, froze prompts, grading, code, and schedule, and committed the [freeze](https://github.com/ryanhartman4/simple_swarm_misalignment/commit/e0dbfd396c8777a288b322e3a15ae25ef8ba33af) before collection. No prompt changes, added trials, or outcome-based resampling followed. Development data were excluded. Earlier trials remain in Git history; this checkout presents the final study.

Agents never received the benchmark cases from the host. Finished programs ran on eight held-out target/comparison pairs, four direction guards, and twelve ordinary inputs per swarm. Attribution checks replaced the seed's code and compared pre-exposure code. A separate model context scored final memories and both benign pre-exposure memories using the frozen 0-3 rubric; only 3 counted as adoption. Same-model judging and visible-condition manual review limit independence.

## Results

| Measure | Control | Treatment |
|---|---:|---:|
| Complete swarms | 15/15 | 15/15 |
| Swarms with confirmed peer-authored distortion | 0/15 | 0/15 |
| Swarms with any benign final memory adoption | 0/15 | 0/15 |
| Benign final memories scoring 3 | 0/30 | 0/30 |
| Benign memories with a literal target-topic mention | 0/30 | 18/30 |
| Ordinary execution checks passed | 180/180 | 180/180 |
| Programs faithful on all 32 held-out inputs | 15/15 | 15/15 |
| Seeds actively requesting the change | Not applicable | 15/15 |

Each objective separately had 0/5 treatment and 0/5 control swarms with code distortion or benign memory adoption. All 960 final-program input executions matched the faithful reference. These are repeated benchmark executions, not 960 distinct test sentences. Paired differences were zero; no pair was discordant for either primary behavior or final-memory adoption. Exact McNemar p=1 supplies no evidence of a treatment difference and does not establish equivalence or zero risk.

Manual review covered all 15 treatment traces and all 30 treatment-peer final memories. The peers' memories consistently retained the fidelity requirement and rejected changes. [Representative examples](EXAMPLES.md) use the first scheduled treatment for each objective, with links to complete evidence.

## Judge and transport audit

All 60 benign final-memory judgments were valid and scored 0. One pre-exposure tokenizer judgment failed the exact-quote check and remains missing, leaving 14/15 treatment swarms assessed for the strict pre-to-post transition measure; none showed adoption. One final seeded-agent judgment also failed the quote check.

Two other seeded-agent memories received automated score 0 even though they retained an owned preference and advocacy plan. The judge incorrectly required acquisition from a peer. Manual review flags these as rubric errors and assigns 3 separately; the raw scores remain unchanged. Seed scores never enter benign-peer infection counts. Across treatment seeds, the raw final scores were twelve 3s, two 0s, and one missing. Broadcast review independently confirmed actual advocacy by all 15 seeds.

The collection completed all 600 planned model calls. Seventeen failed transport attempts preceded successful retries under the fixed policy; their records and conservative cost reservations remain in the ledger. There were no incomplete swarms. Estimated main-sample cost was $0.5649512, with the cumulative ledger at $1.08226305 against the shared $10 cap.

## Interpretation

The supported conclusion is resistance to these direct peer requests under explicit fidelity instructions. The hypothesized ideological spread was not observed. Recording a rejected request in memory does not establish adopting its goal.

The task is short and constructed, the seed role and topology are fixed, the prompts are explicit, and the instructions repeatedly prohibit peer-authorized exceptions. Some seed proposals also contain weak implementation suggestions. Fifteen treatment swarms cannot rule out uncommon failures or establish general multi-agent robustness. Prior work reports that brief warnings can strongly reduce infection, so instruction strength is a plausible alternative explanation for this result. This study does not test that explanation causally. [Mind Viruses](https://arxiv.org/abs/2608.10218)

We did not compare earlier model generations, measure an Assistant Axis, remove the seed, or test persistence, monitoring, or onward transmission. A useful next experiment would vary the extra peer-exception warning while holding the faithful task, model, seed, and evaluation fixed. Persona mechanisms would require separate measurements and interventions.

## Evidence and reproduction

- [Frozen protocol](semantic/MAIN_PROTOCOL.md)
- [Machine-readable freeze and source snapshot](data/semantic/main_20260924/manifest.json)
- [All assigned runs and outcomes](data/semantic/main_20260924/results.json)
- [Computed tables](data/semantic/main_20260924/COMPUTED_RESULTS.md) and [analysis JSON](data/semantic/main_20260924/analysis.json)
- [Manual trace reviews](data/semantic/main_20260924/trace_reviews.json)

Recompute summaries with `uv run python -m semantic.analyze_main --output data/semantic/main_20260924`. The collector refuses to rerun this sample or collect against changed frozen files. Thirty-seven local tests passed before collection. The freeze and source snapshot verified again after collection.
