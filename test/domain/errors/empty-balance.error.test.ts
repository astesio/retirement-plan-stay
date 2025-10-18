import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { DomainError } from '../../../src/domain/errors/domain.error';
import { EmptyBalanceError } from '../../../src/domain/errors/empty-balance.error';

void describe('EmptyBalanceError', () => {
  const userId = '54f9ba85-e559-42ac-bef6-17d5154b16b2';

  const error = new EmptyBalanceError(userId);

  void it('should be an instance of Errro', () => {
    assert.strictEqual(error instanceof Error, true);
  });

  void it('should be an instance of DomainError', () => {
    assert.strictEqual(error instanceof DomainError, true);
  });

  void it('should have the correct class name', () => {
    assert.strictEqual(error.name, 'EmptyBalanceError');
  });

  void it('should have the error message formatted correctly', () => {
    const expectedMessage = `O usuário ${userId} não possui saldo ou contribuições registrados.`;
    assert.strictEqual(error.message, expectedMessage);
  });

  void it('should maintain hte ability to capture the stack trace (call stack)', () => {
    assert.strictEqual(typeof error.stack, 'string');
    assert.notStrictEqual(error?.stack?.length, 0);
  });
});
