import { assertEquals } from 'std/assert/mod.ts';
import { autocompleteIsPresent } from '../src/shell.ts';
import { assertInstanceOf } from 'https://deno.land/std@0.202.0/assert/mod.ts';

Deno.test('Autocomplete does not throw errors', async () => {
  const a = new Boolean(await autocompleteIsPresent());
  assertInstanceOf(a, Boolean);
});
