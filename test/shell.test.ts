import './setup.js';

import {
	assert,
	assertEquals,
} from 'https://deno.land/std@0.110.0/testing/asserts.ts';
import {
	returnsNext,
	stub,
} from 'https://deno.land/std@0.202.0/testing/mock.ts';
import {
	autocompleteIsPresent,
	clearCache,
	configureShell,
} from '../src/shell.ts';
import {
	assertInstanceOf,
	assertRejects,
} from 'https://deno.land/std@0.202.0/assert/mod.ts';

Deno.test('ConfigureShell exits if autocomplete is present', async () => {
	try {
		await configureShell();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'AssertionError');
	}
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
	const autocomplete = new Boolean(await autocompleteIsPresent());
	assertInstanceOf(autocomplete, Boolean);
});
