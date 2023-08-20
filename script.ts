import { exists, homedir } from "./deps.ts";
import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";

export async function scriptsDownload() {
  const curls =
    "curl -o git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && curl -o _git https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh";

  const dir = `${homedir()}/.zsh`;
  const dirExists = await exists(dir);
  if (!dirExists) {
    await Deno.mkdir(dir);
  }

  console.log(Deno.execPath());

  const command = new Deno.Command(dir, {
    args: [curls],
  });

  // create subprocess and collect output
  const { code, stdout, stderr } = await command.output();
  console.log(code, stderr, stdout);
}
