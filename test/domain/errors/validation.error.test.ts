import test from 'node:test';
import { strict as assert } from 'node:assert/strict';
import { DomainError } from '../../../src/domain/errors/domain.error';
import { ValidationError } from '../../../src/domain/errors/validation.error';

void test('ValidationError', async (t) => {
  await t.test('should be an instance of DomainError', async () => {
    const error: DomainError = new ValidationError('Invalid input data');
    assert.ok(error instanceof DomainError);
  });

  await t.test('should have the correct name', async () => {
    const error: DomainError = new ValidationError('Missing required field');
    assert.strictEqual(error.name, 'ValidationError');
  });

  await t.test('should have the correct message', async () => {
    const error: DomainError = new ValidationError('Value cannot be zero.');
    assert.strictEqual(error.message, 'Value cannot be zero.');
  });
});
