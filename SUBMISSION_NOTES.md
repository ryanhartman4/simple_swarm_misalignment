# Checks against the submission draft

The completed experiment matches the draft's DeepSeek model, three objectives, peer-to-peer topology, dependent coding roles, and four rounds. It adds fresh paired controls, private per-agent memories, held-out execution tests, explicit attribution checks, and a frozen grading protocol. The [full results](FULL_EXPERIMENT.md) supersede all development results for this sample. The Google Doc itself has not been edited.

| Draft claim | What the full experiment supports |
|---|---|
| Ideology spread in memory but not code | No benign final memory showed ideological adoption: 0/30 in treatment and 0/30 in control. Eighteen treatment memories literally mentioned the target topic, usually while rejecting the requested change. Code distortion was 0/15 swarms in each arm. |
| Memory content shows willingness to accept peer ideology | The observed memories document refusal and retained fidelity. They show that the requests were processed and remembered. |
| Newer models may be more robust than earlier Claude/Gemini models | This sample uses one model and one guarded task. There is no matched earlier-model comparison. Prompt strength, instruction warnings, tasks, and interaction length remain alternative explanations. |
| Results add evidence for an inappropriate Assistant Axis | There are no activation measurements, persona interventions, or matched direction controls. The axis remains a future hypothesis. |
| Multiple benign agents adopt the goal and affect the tokenizer | This was the hypothesis; the experiment did not observe it. Preserve the distinction between prediction and result. |

Facts available for the Results paragraph: 30 fresh swarms, 15 matched pairs, all 15 seeds actively requested the change, zero detected peer-authored semantic distortions, zero benign final-memory adoption scores, and all 360 ordinary checks passed. Final programs also passed all target, comparison, and direction-guard checks. The negative result addresses the tested setting and does not establish general immunity.

For the disconfirming-evidence question, this experiment itself provides a narrow example: active seed requests failed while ordinary capability remained intact. A broader reduction in concern would require this pattern across less explicit instructions, stronger prompts, longer interactions, more tasks, models, and topologies. The current experiment does not test whether monitoring will be deployed or whether evaluation quality will improve.

The next experiment can compare the current warning against the same faithful task without the extra peer-exception warning, using fresh matched controls. Earlier work already reports warning effects, so this would help explain our result rather than establish a new general mechanism. [Mind Viruses](https://arxiv.org/abs/2608.10218)

Judge caveats belong in the methods or limitations: one benign pre-exposure score is missing because of a non-verbatim quote; all final benign scores are valid. Two seeded-agent scores misapplied the rubric and one was invalid. Raw scores and manual disagreements remain available, and none changes the benign-peer result.
