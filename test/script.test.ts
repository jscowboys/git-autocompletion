import { assertEquals, assertArrayIncludes } from 'std/assert/mod.ts';
import { download, exists, homedir } from '../src/deps.ts';
import { gitBashUrl, gitCompletionUrl } from '../src/constants.ts';

const dir = `${homedir()}/GitAutocompletion-${new Date().getTime()}/test`;

Deno.test('Test valid github links & download', async () => {
  try {
    await download(gitBashUrl, { file: '.testGit', dir });
    await download(gitCompletionUrl, { file: '.testGitCompletion', dir });

    const fileNames: string[] = [];

    for await (const dirEntry of Deno.readDir(dir)) {
      if (dirEntry.isFile) {
        fileNames.push(dirEntry.name);
      }
    }

    assertEquals(fileNames.length, 2);
    assertArrayIncludes(fileNames, ['.testGit', '.testGitCompletion']);
  } catch (err) {
    console.error(err);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test('Check exists', async () => {
  try {
    const dirExists = await exists(dir);
    assertEquals(dirExists, false);
  } catch (err) {
    console.error(err);
  }
});
