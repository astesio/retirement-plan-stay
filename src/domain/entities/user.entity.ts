import crypto from 'node:crypto';
import { ValidationError } from '../errors/validation.error';

export type UserProps = {
  id: string;
  name: string;
  document: string;
};

export type CreateUserProps = {
  name: string;
  document: string;
};

export class User {
  private constructor(private props: UserProps) {
    this.validate();
  }

  private validate(): void {
    if (!this.props.id || this.props.id.trim() === '') {
      throw new ValidationError('User Id cannot be empty.');
    }
  }

  public static create({ name, document }: CreateUserProps): User {
    return new User({
      id: crypto.randomUUID(),
      name,
      document,
    });
  }

  public static with({ id, name, document }: UserProps): User {
    return new User({
      id,
      name,
      document,
    });
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get document(): string {
    return this.props.document;
  }
}
