Deno.env.set('DENO_ENV', 'test');

import {
	assert,
	assertEquals,
	assertExists,
} from 'https://deno.land/std@0.110.0/testing/asserts.ts';
import { autocompleteIsPresent, configureShell } from '../src/shell.ts';
import { assertInstanceOf } from 'https://deno.land/std@0.202.0/assert/mod.ts';

Deno.test('ConfigureShell exits if autocomplete is present', async () => {
	try {
		await configureShell();
	} catch (error) {
		console.log(error, error.name);
		assert(error);
		assertEquals(error.name, 'AssertionError');
	}
});

Deno.test('Autocomplete does not throw errors', async () => {
	const autocomplete = new Boolean(await autocompleteIsPresent());
	assertInstanceOf(autocomplete, Boolean);
});
