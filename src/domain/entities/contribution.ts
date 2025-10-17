import crypto from 'node:crypto';
import { ValidationError } from '../errors/validation.error';

export type ContributionProps = {
  id: string;
  userId: string;
  value: number;
  contributionDate: Date;
  vestingDate: Date; // a data em que o valor estará disponivel para resgate
};

export class Contribution {
  private constructor(private props: ContributionProps) {
    this.validate();
  }

  private validate(): void {
    if (!this.props.id || this.props.id.trim() === '') {
      throw new ValidationError('User Id cannot be empty.');
    }
  }

  public static create(
    userId: string,
    value: number,
    contributionDate: Date,
    vestingDate: Date,
  ): Contribution {
    return new Contribution({
      id: crypto.randomUUID(),
      userId: userId,
      value: value,
      contributionDate: contributionDate,
      vestingDate: vestingDate,
    });
  }

  public static with(
    id: string,
    userId: string,
    value: number,
    contributionDate: Date,
    vestingDate: Date,
  ): Contribution {
    return new Contribution({
      id,
      userId,
      value,
      contributionDate,
      vestingDate,
    });
  }

  isAvailableForRedemption(currentDate: Date = new Date()): boolean {
    // em PRD poderia ter um V.O para Data verificando o formato data como o fuso horario (UTC)
    return currentDate >= this.props.vestingDate;
  }

  public get id(): string {
    return this.props.id;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
