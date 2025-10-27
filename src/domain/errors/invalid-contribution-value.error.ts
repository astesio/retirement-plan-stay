import { DomainError } from './domain.error';

export class InvalidContributionValueError extends DomainError {
  constructor() {
    super('O valor da contribuição deve ser positivo.');
    this.name = 'InvalidContributionValueError';
  }
}
