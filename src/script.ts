import { dir, gitBashUrl, gitCompletionUrl } from './constants.ts';
import { download, exists } from './deps.ts';

export async function downloadScripts() {
	const dirExists = await exists(dir);
	if (!dirExists) {
		await Deno.mkdir(dir);
	}

	try {
		await download(gitBashUrl, { file: '.git', dir });
		await download(gitCompletionUrl, { file: '.gitCompletion', dir });
		console.log(`✅ scripts downloaded in folder ${dir}`);
	} catch (err) {
		console.error(err);
	}
}
