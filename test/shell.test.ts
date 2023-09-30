Deno.env.set('DENO_ENV', 'test');

import { autocompleteIsPresent } from '../src/shell.ts';
import { assertInstanceOf } from 'https://deno.land/std@0.202.0/assert/mod.ts';

Deno.test('Autocomplete does not throw errors', async () => {
  const autocomplete = new Boolean(await autocompleteIsPresent());
  assertInstanceOf(autocomplete, Boolean);
});
