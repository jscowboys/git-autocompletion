import { exists, homedir } from './deps.ts';

export async function scriptsDownload() {
  // const dir = 'mkdir -p ~/.zsh';
  //const cd = 'cd ~/.zsh ';
  //   const curls =
  //     'curl -o git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && curl -o _git https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh';

  const dir = `${homedir()}/.zsh`;
  const dirExists = await exists(dir);
  if (!dirExists) {
    await Deno.mkdir(dir);
  }
  //const command = new Deno.Command(Deno.execPath(), { args: [dir, cd, curls] });

  //return await exec(`${dir} && ${cd} && ${curls}`); //, (error, _stdout, stderr) => {
  // if (error) {
  //   console.log(`error: ${error.message}`);
  //   return;
  // }
  // if (stderr) {
  //   console.log(`stderr: ${stderr}`);
  //   return;
  // }
  //});
}
