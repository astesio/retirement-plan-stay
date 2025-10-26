import { DomainError } from './domain.error';

export class UserAlreadyExistsError extends DomainError {
  constructor(document: string) {
    super(`User with Document ${document} already exists.`);
    this.name = 'UserAlreadyExists';
  }
}
