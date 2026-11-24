// The Robot Vacuum's Best Excuse — make.fun entry.
//
// Writes one deadpan excuse from a robot vacuum to /output/entry.txt.
// The line is fixed and deterministic: the same bytes on every run, no
// clock, no randomness, no network, no model calls.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Deadpan robot voice, in the vacuum's own world: the dust bunny under
// the bed is no longer dirt to it, it is a tenant — and the punch lands
// at the end, when the vacuum admits eviction is above its pay grade.
// The line is 103 characters, inside the 1-140 gate.
const LINE =
  "The dust bunny under the bed pays rent in crumbs now, so I let it stay. Eviction is above my pay grade.";

mkdirSync(OUTPUT_DIR, { recursive: true });

// Self-check the gate before writing: UTF-8 text, 1 to 140 characters,
// not only white space. Fail loudly instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} characters, outside the 1-140 gate`);
}

writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
