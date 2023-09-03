import { assertEquals } from 'https://deno.land/std@0.201.0/assert/mod.ts';
import { delay } from 'https://deno.land/std@0.201.0/async/delay.ts';

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
