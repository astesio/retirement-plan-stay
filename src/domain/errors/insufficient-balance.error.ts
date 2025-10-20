import { DomainError } from './domain.error';

export class InsufficientBalanceError extends DomainError {
  constructor(redemptionValue: number, available: number) {
    super(
      `Valor solicitado (${redemptionValue}) excede o saldo disponível (${available}).`,
    );
    this.name = 'InsufficientBalanceError';
  }
}
