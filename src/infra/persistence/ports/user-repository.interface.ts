import { User } from '../../../domain/entities/user.entity';

export abstract class IUserRepositoryInterface {
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}
