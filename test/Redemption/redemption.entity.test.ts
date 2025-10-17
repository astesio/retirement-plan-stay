import crypto from 'node:crypto';
import assert from 'node:assert';
import { afterEach, describe, it, mock } from 'node:test';
import {
  Redemption,
  RedemptionStatus,
} from '../../src/Redemption/redemption.entity';
import { ValidationError } from '../../src/domain/errors/validation.error';

const FIXED_USER_ID = 'user-456';
const FIXED_VALUE = 50.0;
const MOCKED_UUID = 'mocked-redemption-id-123';
const MOCKED_DATE = new Date('2025-06-15T10:00:00.00Z');

mock.method(crypto, 'randomUUID', () => MOCKED_UUID);

afterEach(() => {
  mock.restoreAll();
});

void describe('Redemption Class', () => {
  void describe('Static Factory: create()', () => {
    void it('should create a Redemption instance with PENDING status, current value and date', () => {
      const redemption = Redemption.create(FIXED_USER_ID, FIXED_VALUE);

      assert.strictEqual(redemption instanceof Redemption, true);
      // assert.strictEqual(
      //   crypto.randomUUID.mock.callCount(),
      //   1,
      //   'crypto.randomUUID() deve ter sido chamado uma vez.',
      // );
      assert.strictEqual(redemption.status, RedemptionStatus.PENDING);
      assert.strictEqual(redemption.value, FIXED_VALUE);
    });
  });
});

void describe('Static Factory: with() and Validation', () => {
  void it('should create an instance of Redemption with all the given properties', () => {
    const customStatus = RedemptionStatus.PROCESSED;
    const customDate = new Date('2024-02-01T10:00:00.000Z');

    const redemption = Redemption.with(
      MOCKED_UUID,
      FIXED_USER_ID,
      FIXED_VALUE,
      customDate,
      customStatus,
    );

    assert.strictEqual(redemption instanceof Redemption, true);
    assert.strictEqual(redemption.value, FIXED_VALUE);
    assert.strictEqual(redemption.status, customStatus);
  });

  void it('should throw ValidationError if ID is empty (constructor validation)', () => {
    const emptyId = '';

    assert.throws(() => {
      Redemption.with(
        emptyId,
        FIXED_USER_ID,
        FIXED_VALUE,
        MOCKED_DATE,
        RedemptionStatus.PENDING,
      );
    }, ValidationError);
  });
});
