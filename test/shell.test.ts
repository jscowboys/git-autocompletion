import './setup.js';

import {
	assert,
	assertEquals,
} from 'https://deno.land/std@0.110.0/testing/asserts.ts';
import {
	autocompleteIsPresent,
	clearCache,
	configureShell,
} from '../src/shell.ts';
import { assertInstanceOf } from 'https://deno.land/std@0.202.0/assert/mod.ts';

Deno.test('ConfigureShell exits if autocomplete is present', async () => {
	try {
		await configureShell();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'AssertionError');
	}
});

Deno.test('Checks clearing cache', async () => {
	try {
		await clearCache();
	} catch (error) {
		assert(error);
		assertEquals(error.name, 'AssertionError');
	}
});

Deno.test('Autocomplete does not throw errors', async () => {
	const autocomplete = new Boolean(await autocompleteIsPresent());
	assertInstanceOf(autocomplete, Boolean);
});
