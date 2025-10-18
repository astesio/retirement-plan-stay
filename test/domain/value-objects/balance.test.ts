import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Balance } from '../../../src/domain/value-objects/balance';

void describe('Balance Class (Value Object)', () => {
  const totalValue = 1500.75;
  const availableValue = 500.25;

  void it('should store the values ​​of total and availableForRedemption correctly in the constructor', () => {
    const balance = new Balance(totalValue, availableValue);

    const jsonOutput = balance.toJSON();

    assert.strictEqual(jsonOutput.total, totalValue);
    assert.strictEqual(jsonOutput.availableForRedemption, availableValue);
  });

  void it('should format the object to JSON correctly using the toJSON() method', () => {
    const balance = new Balance(totalValue, availableValue);

    const expectedJson = {
      total: 1500.75,
      availableForRedemption: 500.25,
    };

    const jsonOutput = balance.toJSON();

    assert.deepStrictEqual(jsonOutput, expectedJson);
  });

  void it('should correctly handle zero values', () => {
    const balance = new Balance(0, 0);

    const expectedJson = {
      total: 0,
      availableForRedemption: 0,
    };

    const jsonOutput = balance.toJSON();

    assert.deepStrictEqual(jsonOutput, expectedJson);
  });
});
