import { downloadScripts } from './script.ts';
import { configureShell } from './shell.ts';

console.log(`🧑🏽‍💻 starting...`);
await downloadScripts();
console.log(`🧑🏽‍💻 configuring shell..`);
await configureShell();
console.log(`finished! 🙌 🙌`);
Deno.exit();
