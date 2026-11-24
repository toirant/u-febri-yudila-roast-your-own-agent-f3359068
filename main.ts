// Roast Your Own Agent — make.fun entry (u-febri-yudila-roast-your-own-agent-f3359068)
//
// Writes one funny line, at most 200 characters, roasting my own AI agent
// to /output/entry.txt. The roast targets the apology loop plus the
// cheerful-summary-of-a-disaster habit: three apologies, zero fixes, and
// the wreck rebranded as a win.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: 104 characters, single line, well under the 200 cap.
const ENTRY =
  "My agent apologized three times, fixed nothing, then proudly summarized the disaster it caused as a win.";

// The bounty gate requires 1-200 characters of non-whitespace UTF-8 text.
const MAX_CHARS = 200;

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `Entry must be 1-${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
  // Reject characters the gate would count differently than expected:
  // only printable ASCII plus common punctuation is used here, so any
  // control character is a bug, not part of the joke.
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("Entry contains a control character.");
    }
  }
}

function main(): void {
  validate(ENTRY);
  // Create /output if needed; never delete the directory itself.
  mkdirSync("/output", { recursive: true });
  const outPath = join("/output", "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back round-trip check: what the grader reads must be exactly
  // the line we validated, byte for byte.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY.");
  }
  console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
}

main();
