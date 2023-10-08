import './setup.js';

import { assertEquals } from 'std/assert/mod.ts';
import { delay } from 'std/async/delay.ts';

Deno.test('hello world #1', () => {
	const x = 1 + 2;
	assertEquals(x, 3);
});

Deno.test('async hello world #2', async () => {
	const x = 1 + 2;

	// await some async task
	await delay(100);

	if (x !== 3) {
		throw Error('x should be equal to 3');
	}
});
