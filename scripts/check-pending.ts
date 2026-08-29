/**
 * Content gate.
 *
 * Always prints the outstanding-content report so unapproved placeholders are
 * impossible to miss during a build. Under GUIDE_STRICT_CONTENT=1 it exits
 * non-zero if anything blocking a launch is still a placeholder, so the
 * production build fails rather than shipping invented or missing content.
 */
import { pendingContent, unresolved, unresolvedBlocking } from '../content/pending.ts';

const strict = process.env['GUIDE_STRICT_CONTENT'] === '1';
const open = unresolved();
const blocking = unresolvedBlocking();

const rule = '='.repeat(72);
console.log(`\n${rule}\nCONTENT GATE — ${open.length} of ${pendingContent.length} items unresolved\n${rule}`);

for (const item of open) {
  console.log(`  [${item.blocks.toUpperCase().padEnd(6)}] ${item.id}\n           ${item.what}\n           from: ${item.from}`);
}

if (open.length === 0) {
  console.log('  All content approved.');
}

console.log(rule);

if (blocking.length > 0) {
  const msg = `${blocking.length} item(s) block a production launch.`;
  if (strict) {
    console.error(`\nBUILD REFUSED: ${msg}\nResolve them or unset GUIDE_STRICT_CONTENT for a development build.\n`);
    process.exit(1);
  }
  console.log(`\nWARNING: ${msg}\nThis build is for development review only. Set GUIDE_STRICT_CONTENT=1 to enforce.\n`);
}
