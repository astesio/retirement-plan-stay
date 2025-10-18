import { DomainError } from './domain.error';

export class EmptyBalanceError extends DomainError {
  constructor(userId: string) {
    super(`O usuário ${userId} não possui saldo ou contribuições registrados.`);
    this.name = 'EmptyBalanceError';
  }
}
