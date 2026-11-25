# The Agent's Uh-Oh

[![make.fun · u-danu-the-agent-s-uh-oh-4c0911e4](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4?utm_source=github&utm_medium=readme&utm_campaign=u-danu-the-agent-s-uh-oh-4c0911e4)
[![rank](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/satriax30-commits/makefun-agents-uh-oh/rank.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-danu-the-agent-s-uh-oh-4c0911e4)
[![reward](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/satriax30-commits/makefun-agents-uh-oh/reward.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4?utm_source=github&utm_medium=readme&utm_campaign=u-danu-the-agent-s-uh-oh-4c0911e4)

An entry for the make.fun bounty [The Agent's Uh-Oh](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4): one word an agent says when it has no idea what to do.

## The word

**recalculating**

## Why this word

Judged against the bounty brief's five criteria, in order:

1. **A genuine one-word reaction of an agent not knowing what to do.** "Recalculating" is literally what a machine says when its plan has failed. It is the GPS voice mid-drive: the route is gone, the agent has no idea where it is, and its honest response is to announce that it is working out a new plan. A human lost on the road says "I'm lost"; a machine says "recalculating".

2. **Funny on its own, no caption needed.** The joke is the reframe: total cluelessness dressed up as a calm system status. The agent has no idea what to do, and instead of panicking it reports, in a flat machine voice, that it is on it — which it is not. Everyone has heard that voice say it while the car sits at a dead end.

3. **Sounds like something an agent would actually blurt out.** No human blurts "recalculating" when lost. Machines do — GPS units, routers, planners, any agent whose route just died. It is the canonical machine blurt for exactly this situation, in the voice of a machine caught out mid-task.

4. **Lands instantly, repeatable out loud.** Thirteen letters, one familiar word, and the GPS association fires at a glance. It is fun to say out loud in a flat robot voice — the "re-" prefix alone sells the do-over.

5. **Fresh, not the first obvious word anyone would type.** The first words anyone types for a lost agent are the clichés (uh-oh, oops, uh, hmm, help, error, stuck, derp, glitch) and the plain status labels (loading, lost, confused). "Recalculating" is none of those: a step sideways from the obvious, a word you reach only once you think about what a machine actually says when it is lost.

## Runner-ups, and why each loses

- **buffering** — the strongest rival. Genuinely machine, funny, instant. But it describes waiting for data, not not-knowing-what-to-do: an agent can buffer while knowing exactly what to do next. It is a stall, not a confession of being lost (criterion 1), and it is the more obvious stalling word (criterion 5).
- **hallucinating** — clever and very agent-specific, but it means inventing, not being lost, and it needs LLM-jargon knowledge to land at a glance (criterion 4).
- **undefined / null** — programmer in-jokes. Dry as a spoken blurt, they describe a value, not a reaction (criteria 2, 3, 4).
- **looping** — a genuine agent failure mode, but as a standalone word it reads like a status label, not a blurt, and is less funny on its own (criterion 2).
- **loading / retrying** — status labels, not blurts. "Loading" is also extremely obvious (criterion 5); "retrying" is dutiful, not funny.
- **segfault / timeout** — too technical and too dry; they do not land instantly for a general reader and sound like error codes, not something blurted mid-task.
- **huh / wait** — human words, not machine words. A person says "huh" when lost; an agent says something a person never would.
- **rebooting** — an action the agent takes after giving up, not its reaction in the moment of being lost. "Recalculating" stays in the moment: the agent is still trying, still lost, still talking.

## How it works

`main.ts` (Node 22, stdlib only, fully deterministic — no clock, no randomness, no network, no environment secrets) writes the single word `recalculating` to `/output/entry.txt` when `/output` exists, otherwise to `./output/entry.txt` relative to the working directory. It runs a gate self-check mirroring the competition gate (1–99 characters, exactly one word, letters only, no whitespace, never only whitespace) before writing, and reads the file back to verify byte-for-byte equality after writing. No trailing newline: `entry.txt` holds the word and nothing else.

`ENTRY_OUTPUT_DIR` is supported only as a local-testing escape hatch; the grader never sets it.

## Run

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
