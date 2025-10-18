import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BalanceCalculator } from '../../../src/Balance/services/balance-calculator';
import { Contribution } from '../../../src/domain/entities/contribution';
import { Balance } from '../../../src/domain/value-objects/balance';

const FIXED_CONTRIBUTION_ID = 'b97c5043-069d-4de8-ae59-2baba1f159cf';

void describe('BalanceCalculator.calculate()', () => {
  void it('should return zero balance when the contribution list is empty', () => {
    const contributions: Contribution[] = [];

    const result = BalanceCalculator.calculate(contributions);
    const resultJOSN = result.toJSON();

    assert.strictEqual(resultJOSN.total, 0);
    assert.strictEqual(resultJOSN.availableForRedemption, 0);
    assert.strictEqual(result instanceof Balance, true);
  });

  void it('should correctly calculate the total and the available amount (all available)', () => {
    const contributions: Contribution[] = [
      Contribution.create(
        FIXED_CONTRIBUTION_ID,
        100,
        new Date('2024-01-01T00:00:00.000Z'),
        new Date('2024-01-01T00:00:00.000Z'),
      ),
      Contribution.create(
        FIXED_CONTRIBUTION_ID,
        200,
        new Date('2024-12-31T23:59:59.000Z'),
        new Date('2024-12-31T23:59:59.000Z'),
      ),
    ];

    const expectedTotal = 300;
    const expectedAvailable = 300;
    const result = BalanceCalculator.calculate(contributions);
    const resultJOSN = result.toJSON();

    assert.strictEqual(resultJOSN.total, expectedTotal);
    assert.strictEqual(resultJOSN.availableForRedemption, expectedAvailable);
  });

  void it('should correctly calculate the total and the available (mixed) amount', () => {
    const contributions: Contribution[] = [
      Contribution.create(
        FIXED_CONTRIBUTION_ID,
        50,
        new Date('2025-04-30T10:00:00.000Z'),
        new Date('2025-04-30T10:00:00.000Z'),
      ),
      Contribution.create(
        FIXED_CONTRIBUTION_ID,
        25,
        new Date('2025-04-30T10:00:00.000Z'),
        new Date('2024-04-30T10:00:00.000Z'),
      ),
      Contribution.create(
        FIXED_CONTRIBUTION_ID,
        100,
        new Date('2025-04-30T10:00:00.000Z'),
        new Date('2026-04-30T10:00:00.000Z'),
      ),
    ];

    const expectedTotal = 175;
    const expectedAvailable = 75;

    const result = BalanceCalculator.calculate(contributions);
    const resultJOSN = result.toJSON();

    assert.strictEqual(resultJOSN.total, expectedTotal);
    assert.strictEqual(resultJOSN.availableForRedemption, expectedAvailable);
  });
});
