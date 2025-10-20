import { DomainError } from './domain.error';

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`O usuário ${userId} não foi encontrado em nossos registros.`);
    this.name = 'UserNotFoundError';
  }
}
