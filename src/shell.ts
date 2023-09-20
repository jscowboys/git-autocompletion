import { autocompletionFlag, cacheDir, lines } from './constants.ts';
import { homedir } from './deps.ts';

export async function configureShell() {
  const autocompletePresent = await autocompleteIsPresent(); //Checks if autocomplete is already installed
  if (autocompletePresent) {
    console.log('Git completion already present! Reload your shell');
    Deno.exit();
  }

  await writeAutocompletion(); //If not, writes autocompletion
  await clearCache(); //Clear out the shell’s autocompletion cache

  console.log(`✅ Shell configured!`);
}

export async function clearCache() {
  try {
    await Deno.remove(`${homedir()}/.zcompdump`);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

export async function writeAutocompletion() {
  try {
    await Deno.writeTextFile(`${homedir()}/.zshrc`, `\n\n${lines}`, {
      append: true,
    });
    console.log(`✅ File saved!!`);
  } catch (error) {
    throw error;
  }
}

export async function autocompleteIsPresent(): Promise<boolean | never> {
  try {
    const file = await Deno.readTextFile(`${homedir()}/.zshrc`);
    return file.includes(autocompletionFlag);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
    return true;
  }
}
