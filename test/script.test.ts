Deno.env.set('DENO_ENV', 'test');

import {
  assertArrayIncludes,
  assertEquals,
  assertExists,
} from 'std/assert/mod.ts';

import { downloadScripts } from '../src/script.ts';

Deno.test('check downloadScripts function', async () => {
  const dir = await downloadScripts();
  assertExists(dir);

  const fileNames: string[] = [];

  for await (const dirEntry of Deno.readDir(dir)) {
    if (dirEntry.isFile) {
      fileNames.push(dirEntry.name);
    }
  }
  assertEquals(fileNames.length, 2);
  assertArrayIncludes(fileNames, ['.git', '.gitCompletion']);
  await Deno.remove(dir, { recursive: true });
});
