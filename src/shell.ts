import { cacheDir, lines, autocompletionFlag } from './constants.ts';
import { exists, homedir } from './deps.ts';

export async function configureShell() {
  const autocompletePresent = await autocompleteIsPresent();
  if (autocompletePresent) {
    console.log('Git completion already present! Reload your shell');
    return;
  }

  await Deno.writeTextFile(`${homedir()}/.zshrc`, `\n\n${lines}`, {
    append: true,
  });
  console.log(`✅ File saved!!`);

  const dirExists = await exists(cacheDir);
  if (dirExists) {
    await Deno.remove(`${homedir()}/.zcompdump`); //Clear out the shell’s autocompletion cache
  }

  console.log(`✅ Shell configured!`);
}

async function autocompleteIsPresent(): Promise<boolean | never> {
  try {
    const file = await Deno.readTextFile(`${homedir()}/.zshrc`);
    return file.includes(autocompletionFlag);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
    return false;
  }
}
