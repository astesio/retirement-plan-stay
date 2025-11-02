import crypto from 'node:crypto';
import { ValidationError } from '../errors/validation.error';

export type ContributionProps = {
  id: string;
  userId: string;
  value: number;
  redeemedValue: number;
  contributionDate: Date;
  vestingDate: Date; // a data em que o valor estará disponivel para resgate
};

export type ConsumedContribution = {
  id: string;
  consumedValue: number;
};

export class Contribution {
  private constructor(private props: ContributionProps) {
    this.validate();
  }

  private validate(): void {
    if (!this.props.id || this.props.id.trim() === '') {
      throw new ValidationError('Contribution Id cannot be empty.');
    }
  }

  // todo: FAZER PARA TODAS AS ENTITIES mudar a forma de se fazer o contrutor para parametros nomeados,
  // mais claro a leitura do que passar os valores diretamente, ALEM DE NAO PRECISAR PASSAR NA MESMA ORDEM
  public static create(
    userId: string,
    value: number,
    redeemedValue: number,
    contributionDate: Date,
    vestingDate: Date,
  ): Contribution {
    return new Contribution({
      id: crypto.randomUUID(),
      userId,
      value,
      redeemedValue,
      contributionDate,
      vestingDate,
    });
  }

  // todo: FAZER PARA TODAS AS ENTITIES mudar a forma de se fazer o contrutor para parametros nomeados,
  // mais claro a leitura do que passar os valores diretamente, ALEM DE NAO PRECISAR PASSAR NA MESMA ORDEM
  public static with(
    id: string,
    userId: string,
    value: number,
    redeemedValue: number,
    contributionDate: Date,
    vestingDate: Date,
  ): Contribution {
    return new Contribution({
      id,
      userId,
      value,
      redeemedValue,
      contributionDate,
      vestingDate,
    });
  }

  isAvailableForRedemption(currentDate: Date = new Date()): boolean {
    // FAZER UM VALUE OBJECT SO PARA DATA verificando o formato data como o fuso horario (UTC)
    return currentDate >= this.props.vestingDate;
  }

  public get id(): string {
    return this.props.id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get value(): number {
    return this.props.value;
  }

  public get redeemedValue(): number {
    return this.props.redeemedValue;
  }

  public get contributionDate(): Date {
    return this.props.contributionDate;
  }

  public get vestingDate(): Date {
    return this.props.vestingDate;
  }
}
