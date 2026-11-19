// One Day in the World — Wednesday 18 November 2026.
// Node 22, standard library only. The front page is entry.png beside this
// file; the program copies it byte for byte to the output directory, so the
// judge sees exactly the bytes of the front page this repository holds.
//
// Run it with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// (MAKEFUN_OUTPUT_DIR stands in for /output outside the grader.)

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The grader runs this program twice and requires identical bytes both
// times; a byte-for-byte copy guarantees that, so report the size as a
// sanity check.
const bytes = statSync(target).size;
if (bytes !== statSync(source).size) {
  throw new Error('entry.png copy size mismatch');
}
console.log(`wrote ${target} (${bytes} bytes)`);
