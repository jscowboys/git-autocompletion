import { cacheDir, lines } from './constants.ts';
import { exists, homedir } from './deps.ts';

export async function configureShell() {
	await Deno.writeTextFile(`${homedir()}/.zshrc`, `\n\n${lines}`, {
		append: true,
	});
	console.log(`✅ File saved!!`);

	const dirExists = await exists(cacheDir);
	if (dirExists) {
		await Deno.remove(`${homedir()}/.zcompdump`); //Clear out the shell’s autocompletion cache
	}

	console.log(`✅ Shell configured!`);
}
