import { homedir } from "./deps.ts";
import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";

export async function configureShell() {
  const lines =
    `zstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash \n fpath=(~/.zsh $fpath) \n \n autoload -Uz compinit && compinit`;
  const clearCache = "rm ~/.zcompdump";
  const reloadShell = "source ~/.zshrc";
  const dir = `${homedir()}/.zshrc`;

  try {
    await Deno.writeTextFile(dir, `\n\n${lines}`, { append: true });
    console.log(`✅ File saved!!`);
    await exec(`${clearCache} && ${reloadShell}`);
    console.log(`✅ Cache & Shell reloaded!!`);
  } catch (error) {
    return error.message;
  }
}
