import crypto from 'node:crypto';
import { ValidationError } from '../../src/domain/errors/validation.error';

export enum RedemptionStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
}

export type RedemptionProps = {
  id: string;
  userId: string;
  value: number;
  requestDate: Date;
  status: RedemptionStatus;
};

export class Redemption {
  private constructor(private readonly props: RedemptionProps) {
    this.validate();
  }

  private validate(): void {
    if (!this.props.id || this.props.id.trim() === '') {
      throw new ValidationError('User Id cannot be empty.');
    }
  }

  public static create(userId: string, value: number): Redemption {
    return new Redemption({
      id: crypto.randomUUID(),
      userId: userId,
      value: value,
      requestDate: new Date(),
      status: RedemptionStatus.PENDING,
    });
  }

  public static with(
    id: string,
    userId: string,
    value: number,
    requestDate: Date,
    status: RedemptionStatus,
  ): Redemption {
    return new Redemption({
      id,
      userId,
      value,
      requestDate,
      status,
    });
  }

  public get value(): number {
    return this.props.value;
  }

  public get status(): RedemptionStatus {
    return this.props.status;
  }
}
