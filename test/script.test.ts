import './setup.js';

import { stub } from 'https://deno.land/std@0.202.0/testing/mock.ts';

import { exists } from '../src/deps.ts';

import {
	assert,
	assertArrayIncludes,
	assertEquals,
	assertExists,
} from 'std/assert/mod.ts';

import { downloadScripts } from '../src/script.ts';

Deno.test('check downloadScripts function', async () => {
	const scriptsDir = await downloadScripts();
	assertExists(scriptsDir);

	const fileNames: string[] = [];

	for await (const dirEntry of Deno.readDir(scriptsDir)) {
		if (dirEntry.isFile) {
			fileNames.push(dirEntry.name);
		}
	}
	assertEquals(fileNames.length, 2);
	assertArrayIncludes(fileNames, ['.git', '.gitCompletion']);
	await Deno.remove(scriptsDir, { recursive: true });
});

Deno.test('check downloadScripts function on errors', async () => {
	const mkdirStub = stub(Deno, 'mkdir', async () => {
		throw new Deno.errors.NotFound();
	});
	try {
		await downloadScripts();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'NotFound');
	} finally {
		mkdirStub.restore();
	}
});
