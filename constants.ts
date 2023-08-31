import { homedir } from './deps.ts';

export const gitBashUrl =
  'https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash';

export const gitCompletionUrl =
  'https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh';

export const dir = `${homedir()}/.zsh`;
export const cacheDir = `${homedir()}/.zcompdump`;
export const lines = `# Load Git completion \nzstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash \nfpath=(~/.zsh $fpath) \n \nautoload -Uz compinit && compinit`;
