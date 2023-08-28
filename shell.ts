import { homedir } from './deps.ts';
import { OutputMode, exec } from 'https://deno.land/x/exec@0.0.5/mod.ts';

const lines = `# Load Git completion \nzstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash \nfpath=(~/.zsh $fpath) \n \nautoload -Uz compinit && compinit`;
//const reloadShell = 'source ~/.zshrc';

export async function configureShell() {
  try {
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

    const command = new Deno.Command(Deno.execPath(), {
      args: ['source', `${homedir()}/.zshrc`],
    });
    const { code, stdout, stderr } = command.outputSync();
    console.log('HOLAAAA', code.toString(), stdout.toString(), stderr);

    console.log(`✅ Shell configured!`);
  } catch (error) {
    console.error(error);
  }
}
