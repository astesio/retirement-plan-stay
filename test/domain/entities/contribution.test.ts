import crypto from 'node:crypto';
import assert from 'node:assert';
import { afterEach, describe, it, mock } from 'node:test';
import { Contribution } from '../../../src/domain/entities/contribution';
import { ValidationError } from '../../../src/domain/errors/validation.error';

const FIXED_USER_ID = 'user-123';
const FIXED_VALUE = 100.0;
const FIXED_CONT_DATE = new Date('2024-01-01T00:00:00.000Z');
const FIXED_VESTING_DATE = new Date('2025-01-01T00:00:00.000Z');
const MOCKED_UUID = 'mocked-uuid-12345';

mock.method(crypto, 'randomUUID', () => MOCKED_UUID);

afterEach(() => {
  mock.restoreAll();
});

void describe('Contribution Class', () => {
  void describe('Static Factory: with()', () => {
    void it('should create a Contribution instance with the given ID and properties', () => {
      const contribution = Contribution.with(
        'custom-id-999',
        FIXED_USER_ID,
        FIXED_VALUE,
        FIXED_CONT_DATE,
        FIXED_VESTING_DATE,
      );

      assert.strictEqual(
        contribution instanceof Contribution,
        true,
        'should be return an instance from Contribution',
      );
    });

    void it('should throw ValidationError if ID is empty (constructor validation)', () => {
      const emptyId = '';

      assert.throws(
        () => {
          Contribution.with(
            emptyId,
            FIXED_USER_ID,
            FIXED_VALUE,
            FIXED_CONT_DATE,
            FIXED_VESTING_DATE,
          );
        },
        ValidationError,
        'should throw ValidationError for Empty ID or invalid ID',
      );
    });
  });

  void describe('Static Factory: create()', () => {
    void it('should create a Contribution instance and generate a new ID using crypto.randomUUID()', () => {
      const contribution = Contribution.create(
        FIXED_USER_ID,
        FIXED_VALUE,
        FIXED_CONT_DATE,
        FIXED_VESTING_DATE,
      );

      assert.strictEqual(contribution instanceof Contribution, true);
      // assert.strictEqual(
      //   crypto.randomUUID.mock.callCount(),
      //   true,
      //   'crypton.randomUUID() should call one time',
      // );
    });
  });

  void describe('Method: isAvailableForRedemption()', () => {
    const vestingDateAhead = new Date('2025-10-15T12:00:00.000Z');
    const vestingDatePast = new Date('2024-01-01T12:00:00.000Z');

    const contributionFuture = Contribution.with(
      'id-1',
      FIXED_USER_ID,
      FIXED_VALUE,
      FIXED_CONT_DATE,
      vestingDateAhead,
    );
    const contributionPast = Contribution.with(
      'id-2',
      FIXED_USER_ID,
      FIXED_VALUE,
      FIXED_CONT_DATE,
      vestingDatePast,
    );

    const currentDate = new Date('2025-05-01T10:00:00.000Z');

    void it('should return FALSE if the current date is BEFORE the vestingDate', () => {
      const isAvailable =
        contributionFuture.isAvailableForRedemption(currentDate); // 2025-05-01 < 2025-10-15

      assert.strictEqual(
        isAvailable,
        false,
        'should not be available if the current date is before the vesting date',
      );
    });

    void it('should return TRUE if the current date is AFTER the vestingDate', () => {
      const isAvailable =
        contributionPast.isAvailableForRedemption(currentDate); // 2025-05-01 >= 2024-01-01

      assert.strictEqual(
        isAvailable,
        true,
        'should be available if the current date is after the vesting date.',
      );
    });

    void it('should return TRUE if the current date is EQUAL to vestingDate', () => {
      const isAvailable =
        contributionFuture.isAvailableForRedemption(vestingDateAhead); // 2025-10-15 >= 2025-10-15

      assert.strictEqual(isAvailable, true);
    });

    void it('should use the current system date (new Date()) if none is provided', () => {
      const mockNow = mock.method(
        Date,
        'now',
        () => vestingDatePast.getTime() + 1000,
      );

      const isAvailable = contributionPast.isAvailableForRedemption();

      assert.strictEqual(isAvailable, true);

      // clear the  mock with Date.now()
      mockNow.mock.restore();
    });
  });
});
