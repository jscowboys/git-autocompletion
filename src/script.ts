import { scriptsDir, gitBashUrl, gitCompletionUrl } from './constants.ts';
import { download, exists } from './deps.ts';

export async function downloadScripts() {
  const dirExists = await exists(scriptsDir);
  if (!dirExists) {
    await Deno.mkdir(scriptsDir);
  }
  try {
    await download(gitBashUrl, { file: '.git', dir: scriptsDir });
    await download(gitCompletionUrl, {
      file: '.gitCompletion',
      dir: scriptsDir,
    });
    console.log(`✅ scripts downloaded in folder ${scriptsDir}`);
    return scriptsDir;
  } catch (error) {
    throw error;
  }
}
