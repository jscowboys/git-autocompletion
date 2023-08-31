import { homedir } from './deps.ts';
import { exec } from 'https://deno.land/x/exec@0.0.5/mod.ts';

const lines = `# Load Git completion \nzstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash \nfpath=(~/.zsh $fpath) \n \nautoload -Uz compinit && compinit`;
const reloadShell = 'source ~/.zshrc';

export async function configureShell() {
  await Deno.writeTextFile(`${homedir()}/.zshrc`, `\n\n${lines}`, {
    append: true,
  });
  console.log(`✅ File saved!!`);

  try {
    await Deno.remove(`${homedir()}/.zcompdump`); //Clear out the shell’s autocompletion cache
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }

  exec(reloadShell);

  console.log(`✅ Shell configured!`);
}
