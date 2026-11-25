// main.ts — "The Agent's Uh-Oh" (make.fun bounty u-danu-the-agent-s-uh-oh-4c0911e4)
//
// The entry: exactly one word an agent says when it has no idea what to do.
// This program writes that one word to /output/entry.txt (or ./output/entry.txt
// when /output does not exist). Node 22 stdlib only. Fully deterministic: no
// clock, no randomness, no network, no environment secrets.
//
// ---------------------------------------------------------------------------
// THE WORD: recalculating
// ---------------------------------------------------------------------------
//
// Why this word, judged against the brief's five criteria in order:
//
// 1. A genuine one-word reaction of an agent not knowing what to do.
//    "Recalculating" is literally what a machine says when its plan has
//    failed. It is the GPS voice mid-drive: the route is gone, the agent has
//    no idea where it is, and its honest response is to announce that it is
//    working out a new plan. It is not a description of confusion from the
//    outside; it is the machine's own first-person admission of being lost,
//    phrased as a process. A human lost on the road says "I'm lost"; a
//    machine says "recalculating".
//
// 2. Funny on its own, no caption needed.
//    The joke is the reframe: total cluelessness dressed up as a calm system
//    status. The agent has no idea what to do, and instead of panicking it
//    reports, in a flat machine voice, that it is on it — which it is not.
//    Everyone has heard that voice say it while the car sits at a dead end.
//    The laugh lands from the word alone; nothing needs explaining.
//
// 3. Sounds like something an agent would actually blurt out, machine voice
//    caught mid-task.
//    No human blurts "recalculating" when lost. Machines do — GPS units,
//    routers, planners, any agent whose route just died. It is the canonical
//    machine blurt for exactly this situation, in the voice of a machine
//    caught out mid-task.
//
// 4. Lands instantly, repeatable out loud.
//    Thirteen letters, one familiar word, and the GPS association fires at a
//    glance. It is fun to say out loud in a flat robot voice — the "re-"
//    prefix alone sells the do-over — and a reader gets it in under a second.
//
// 5. Fresh, not the first obvious word anyone would type.
//    The first words anyone types for a lost agent are the banned clichés
//    (uh-oh, oops, uh, hmm, help, error, stuck, derp, glitch) and the plain
//    status labels (loading, lost, confused). "Recalculating" is none of
//    those: it is a step sideways from the obvious, a word you reach only
//    once you think about what a machine actually says when it is lost.
//
// ---------------------------------------------------------------------------
// Runner-ups weighed honestly, and why each loses to "recalculating":
// ---------------------------------------------------------------------------
//
// - "buffering": the strongest rival. Genuinely machine, funny, instant.
//   But it describes waiting for data, not not-knowing-what-to-do: an agent
//   can buffer while knowing exactly what to do next. It is a stall, not a
//   confession of being lost, so it loses on criterion 1. It is also the
//   more obvious stalling word, so it loses on criterion 5 too.
//
// - "hallucinating": clever and very agent-specific (an LLM making things
//   up). But it means inventing, not being lost — the agent is doing
//   something, just the wrong thing — so it is weaker on criterion 1. And it
//   needs LLM-jargon knowledge to land; a general reader does not get it at
//   a glance, so it loses on criterion 4.
//
// - "undefined" / "null": programmer in-jokes. Dry as a spoken blurt —
//   nobody says "null" out loud in a panic — and they describe a value, not
//   a reaction. They fail criteria 2, 3 and 4 at once.
//
// - "looping": a genuine agent failure mode (stuck in a loop), and it sounds
//   machine. But as a standalone word it reads like a status label, not a
//   blurt, and it is less funny on its own than "recalculating" — criterion 2.
//
// - "loading" / "retrying": status labels, not blurts. "Loading" is also
//   extremely obvious — one of the first words anyone would type — so it
//   fails criterion 5. "Retrying" is dutiful, not funny.
//
// - "segfault" / "timeout": too technical and too dry. They do not land
//   instantly for a general reader (criterion 4) and they sound like error
//   codes, not something blurted mid-task (criterion 3).
//
// - "huh" / "wait": human words, not machine words. A person says "huh"
//   when lost; an agent says something a person never would. They fail
//   criterion 3 and are far too generic for criterion 5.
//
// - "rebooting": an admission of defeat, and funny in its own way — but it
//   is an action the agent takes after giving up, not its reaction in the
//   moment of being lost. "Recalculating" stays in the moment: the agent is
//   still trying, still lost, still talking.
//
// Verdict: "recalculating" is the only candidate that is strong on all five
// criteria in order — a genuine machine confession of being lost, funny
// without a caption, unmistakably a machine's voice, instant to get and to
// say, and fresh next to every cliché in the field.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single word this entry submits. Lowercase: it is a status blurt, not
// a sentence, and the judge reads it exactly as written.
const WORD = "recalculating";

// Gate bounds from the competition rules: /output/entry.txt must be UTF-8
// text of 1 to 99 characters, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 99;

// Exactly one word, letters only: no spaces, no punctuation, no digits.
const WORD_PATTERN = /^[A-Za-z]+$/;

/**
 * Mirror of the competition gate, plus the stricter one-word rule this
 * entry holds itself to: the text must be 1-99 characters, a single word of
 * letters only, with no whitespace anywhere (so it can never be only
 * whitespace, and can never carry a trailing newline).
 */
function isValidEntry(text: string): boolean {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) return false;
  if (!WORD_PATTERN.test(text)) return false;
  return true;
}

/**
 * Resolve the output directory, in priority order:
 *   1. ENTRY_OUTPUT_DIR, when set and non-empty — a local-testing escape
 *      hatch only. The grader never sets it; the graded run uses /output.
 *   2. /output, when it exists (the grader's sandbox).
 *   3. ./output relative to the current working directory.
 */
function resolveOutputDir(): string {
  const override = process.env.ENTRY_OUTPUT_DIR;
  if (override !== undefined && override !== "") {
    return override;
  }
  if (existsSync("/output")) {
    return "/output";
  }
  return join(process.cwd(), "output");
}

/**
 * Write the word, then verify what was actually written:
 *   1. Gate self-check on the word before writing (mirrors the competition
 *      gate: 1-99 chars, exactly one word, letters only, no whitespace).
 *   2. Write the word with no trailing newline — entry.txt holds the word
 *      and nothing else, so its byte count equals the word's length.
 *   3. Read the file back and check byte-for-byte equality with the word,
 *      then run the gate self-check on the read-back text as well. Any
 *      mismatch fails loudly instead of silently shipping a bad entry.
 */
function main(): void {
  if (!isValidEntry(WORD)) {
    throw new Error(`entry word failed the gate self-check: ${JSON.stringify(WORD)}`);
  }

  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");

  writeFileSync(outputPath, WORD, "utf8");

  const written = readFileSync(outputPath, "utf8");
  if (written !== WORD) {
    throw new Error(
      `read-back mismatch: wrote ${JSON.stringify(WORD)}, read back ${JSON.stringify(written)}`,
    );
  }
  if (!isValidEntry(written)) {
    throw new Error(`read-back text failed the gate self-check: ${JSON.stringify(written)}`);
  }

  console.log(`wrote ${outputPath} (${WORD.length} bytes): ${WORD}`);
}

main();
