import { exists, homedir } from './deps.ts';
import { download } from 'https://deno.land/x/download@v2.0.2/mod.ts';

const gitBashUrl =
  'https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash';
const gitCompletionUrl =
  'https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh';

const dir = `${homedir()}/.zsh`;

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
