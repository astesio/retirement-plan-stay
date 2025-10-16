import { strict as assert } from 'node:assert/strict';
import { test } from 'node:test';

void test('some test', async (t) => {
  await t.test('test', () => {
    assert.equal(1, 1);
  });
});
