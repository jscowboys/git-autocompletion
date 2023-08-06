// const { exec } = require("child_process");
// const fs = require('fs');
// const os = require('os');

// const lines = `zstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash \n fpath=(~/.zsh $fpath) \n \n autoload -Uz compinit && compinit`;
// const clearCache = 'rm ~/.zcompdump';
// const reloadShell = 'source ~/.zshrc';
// const homedir = os.homedir();
// const dir = `${homedir}/.zshrc`;

// module.exports = {
//     configureShell: function() {
//         writeZsh();
//         exec(`${clearCache} && ${reloadShell}`, (error, _stdout, stderr) => {
//             if (error) {
//                 console.log(`error: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return;
//             }
//         });
//     }
// }

// function writeZsh(){
//     fs.appendFileSync(dir, `\n\n${lines}`, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
// }
