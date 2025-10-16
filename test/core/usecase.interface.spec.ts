/* eslint-disable @typescript-eslint/require-await */
import { deepStrictEqual, ok } from 'node:assert';
import { describe, it } from 'node:test';
import { Either, left, right } from '../../src/core/either';
import { Usecase } from '../../src/core/usecase.interface';

type TestInput = { value: number };
type TestOutput = Either<Error, string>;

class TestUsecase implements Usecase<TestInput, TestOutput> {
  async execute(input: TestInput): Promise<TestOutput> {
    if (input.value > 10) {
      return right<Error, string>('Success');
    }
    return left<Error, string>(new Error());
  }
}

void describe('Usecase Interface (Unit)', () => {
  void it('should adhere the implementation Usecase<InputDto, OutputDto>', async () => {
    const testCase = new TestUsecase();
    const input: TestInput = { value: 20 };

    const result = await testCase.execute(input);

    ok(
      typeof testCase.execute === 'function',
      'should execute method is present from implementation',
    );
    ok(result.isRight());
    deepStrictEqual(result.value, 'Success');
  });
});
