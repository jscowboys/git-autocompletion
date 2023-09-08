import { autocompletionFlag, cacheDir, lines } from './constants.ts';
import { homedir } from './deps.ts';

export async function configureShell() {
  //Checks if autocomplete is already installed
  const autocompletePresent = await autocompleteIsPresent();
  if (autocompletePresent) {
    console.log('Git completion already present! Reload your shell');
    Deno.exit();
  }

  //If not, writes autocompletion
  await writeAutocompletion();

  //Clear out the shell’s autocompletion cache
  await clearCache();

  console.log(`✅ Shell configured!`);
}

async function clearCache() {
  try {
    await Deno.remove(`${homedir()}/.zcompdump`);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

async function writeAutocompletion() {
  try {
    await Deno.writeTextFile(`${homedir()}/.zshrc`, `\n\n${lines}`, {
      append: true,
    });
    console.log(`✅ File saved!!`);
  } catch (error) {
    throw error;
  }
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
