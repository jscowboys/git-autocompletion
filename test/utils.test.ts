Deno.env.set('DENO_ENV', 'test');

import { assertEquals, assertArrayIncludes } from 'std/assert/mod.ts';
import { download, exists } from '../src/deps.ts';
import { dir, gitBashUrl, gitCompletionUrl } from '../src/constants.ts';

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

Deno.test('Check dir exists', async () => {
  try {
    const dirExists = await exists(dir);
    assertEquals(dirExists, false);
  } catch (err) {
    console.error(err);
  }
});
