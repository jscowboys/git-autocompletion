import { gitBashUrl, gitCompletionUrl, scriptsDir } from './constants.ts';
import { download, exists } from './deps.ts';

export async function downloadScripts(path = scriptsDir) {
	try {
		const dirExists = await exists(path);
		if (!dirExists) {
			await Deno.mkdir(path);
		}
		await download(gitBashUrl, { file: '.git', dir: path });
		await download(gitCompletionUrl, {
			file: '.gitCompletion',
			dir: path,
		});
		console.log(`✅ scripts downloaded in folder ${path}`);
		return path;
	} catch (error) {
		throw error;
	}
}
