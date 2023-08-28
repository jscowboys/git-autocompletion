import { scriptsDownload } from './script.ts';
import { configureShell } from './shell.ts';

console.log(`🧑🏽‍💻 starting...`);
await scriptsDownload();
console.log(`🧑🏽‍💻 configuring shell..`);
await configureShell();
console.log(`finished! 🙌 🙌`);
Deno.exit();
