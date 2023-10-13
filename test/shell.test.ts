import './setup.js';

import {
	assert,
	assertEquals,
} from 'https://deno.land/std@0.110.0/testing/asserts.ts';
import { stub } from 'https://deno.land/std@0.202.0/testing/mock.ts';
import {
	autocompleteIsPresent,
	clearCache,
	configureShell,
	writeAutocompletion,
} from '../src/shell.ts';
import {
	assertInstanceOf,
	assertRejects,
} from 'https://deno.land/std@0.202.0/assert/mod.ts';
import { resolve } from 'https://deno.land/std@0.110.0/path/win32.ts';
import { homedir } from '../src/deps.ts';

Deno.test('ConfigureShell exits if autocomplete is present', async () => {
	try {
		await configureShell();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'AssertionError');
	}
});

Deno.test('Checks writeAutocompletion on success', async () => {
	const removeStub = stub(
		Deno,
		'writeTextFile',
		async () => await new Promise((resolve) => resolve()),
	);
	try {
		const result = await writeAutocompletion();
		assertEquals(result, undefined);
	} finally {
		removeStub.restore();
	}
});

Deno.test('Checks writeAutocompletion on error', async () => {
	const removeStub = stub(Deno, 'writeTextFile', async () => {
		throw new Deno.errors.AlreadyExists('File is present');
	});
	try {
		await writeAutocompletion();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'AlreadyExists');
	} finally {
		removeStub.restore();
	}
});

Deno.test('Checks clearing cache ', async () => {
	const dir = `${homedir()}/test.txt`;
	const encoder = new TextEncoder();
	const data = encoder.encode('Hello world\n');
	await Deno.writeFile(dir, data, {});
	const result = await clearCache(dir);
	assertEquals(result, undefined);
});

Deno.test('Checks clearing cache when no file is present', async () => {
	const removeStub = stub(Deno, 'remove', async () => {
		throw new Deno.errors.NotFound('No file present');
	});
	try {
		const result = await clearCache();
		assertEquals(result, undefined);
	} finally {
		removeStub.restore();
	}
});

Deno.test('Checks clearing cache when failing', async () => {
	const removeStub = stub(Deno, 'remove', async () => {
		throw new Deno.errors.Busy('Busy');
	});
	try {
		const result = await assertRejects(() => clearCache(), Error);
		assertInstanceOf(result, Deno.errors.Busy);
	} finally {
		removeStub.restore();
	}
});

Deno.test('Autocomplete does not throw errors', async () => {
	const fileStub = stub(
		Deno,
		'readTextFile',
		async () => new Promise((resolve) => resolve('# Load Git completion')),
	);
	try {
		const autocomplete = await autocompleteIsPresent();
		assert(autocomplete);
	} finally {
		fileStub.restore();
	}
});

Deno.test('Autocomplete does return true on NotFound error', async () => {
	const fileStub = stub(Deno, 'readTextFile', async () => {
		throw new Deno.errors.NotFound();
	});
	try {
		const result = await autocompleteIsPresent();
		assert(result);
	} finally {
		fileStub.restore();
	}
});

Deno.test('Autocomplete does return true on NotFound error', async () => {
	const fileStub = stub(Deno, 'readTextFile', async () => {
		throw new Deno.errors.Busy();
	});
	try {
		const result = await autocompleteIsPresent();
		assert(result);
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'Busy');
	} finally {
		fileStub.restore();
	}
});
