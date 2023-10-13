import { autocompletionFlag, cacheDir, dir, lines } from './constants.ts';

export async function configureShell(path = dir, cachePath = cacheDir) {
	const autocompletePresent = await autocompleteIsPresent(path); //Checks if autocomplete is already installed
	console.log(autocompletePresent, path);
	if (autocompletePresent) {
		console.log('✅ Git completion already present! Reload your shell');
		Deno.exit();
	}

	await writeAutocompletion(path); //If not, writes autocompletion
	await clearCache(cachePath); //Clear out the shell’s autocompletion cache

	console.log(`✅ Shell configured!`);
}

export async function clearCache(dir: string) {
	try {
		await Deno.remove(dir);
	} catch (error) {
		if (!(error instanceof Deno.errors.NotFound)) {
			throw error;
		}
	}
}

export async function writeAutocompletion(path: string) {
	try {
		await Deno.writeTextFile(path, `\n\n${lines}`, {
			append: true,
		});
		console.log(`✅ File saved!!`);
	} catch (error) {
		throw error;
	}
}

export async function autocompleteIsPresent(
	path: string,
): Promise<boolean | never> {
	try {
		const file = await Deno.readTextFile(path);
		return file.includes(autocompletionFlag);
	} catch (error) {
		if (!(error instanceof Deno.errors.NotFound)) {
			throw error;
		}
		return false;
	}
}
