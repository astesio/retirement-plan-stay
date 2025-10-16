import test from 'node:test';
import { strict as assert } from 'node:assert/strict';
import { DomainError } from '../../../src/domain/errors/domain.error';

class CustomDomainError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

void test('DomainError', async (t) => {
  await t.test('should be an instance of Error', () => {
    const error: DomainError = new CustomDomainError(
      'this is a custom domain error',
    );
    assert.ok(error instanceof Error);
  });

  await t.test('should have its name set to the class name', () => {
    const error: DomainError = new CustomDomainError('this is a another error');
    assert.strictEqual(error.name, 'CustomDomainError');
  });

  await t.test('should have the correct message', () => {
    const error: DomainError = new CustomDomainError(
      'this is a final error message',
    );
    assert.strictEqual(error.message, 'this is a final error message');
  });
});
