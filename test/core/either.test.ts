import { describe, it } from 'node:test';
import { Left, left, right, Right } from '../../src/core/either';
import assert from 'node:assert';

void describe('Either', () => {
  void describe('Left', () => {
    const leftValue = 'Error';
    const eitherLeft = left(leftValue);
    const leftInstance = new Left(leftValue);

    void it('should create an instance of Left correctly', () => {
      assert.strictEqual(eitherLeft instanceof Left, true);
      assert.strictEqual(eitherLeft instanceof Right, false);
      assert.strictEqual(eitherLeft.value, leftValue);
    });

    void it('should verification methods work for Left', () => {
      assert.strictEqual(eitherLeft.isLeft(), true);
      assert.strictEqual(eitherLeft.isRight(), false);
    });

    void it('should direct Left instance have correct value', () => {
      assert.strictEqual(leftInstance.value, leftValue);
    });
  });

  void describe('Right', () => {
    const rightValue = 42;
    const eitherRight = right(rightValue);
    const rightInstance = new Right(rightValue);

    void it('should create an instance of Right correctly', () => {
      assert.strictEqual(eitherRight instanceof Right, true);
      assert.strictEqual(eitherRight instanceof Left, false);
      assert.strictEqual(eitherRight.value, rightValue);
    });

    void it('should verification methods work for Right', () => {
      assert.strictEqual(eitherRight.isLeft(), false);
      assert.strictEqual(eitherRight.isRight(), true);
    });

    void it('should direct Left instance have correct value', () => {
      assert.strictEqual(rightInstance.value, rightValue);
    });
  });
});
