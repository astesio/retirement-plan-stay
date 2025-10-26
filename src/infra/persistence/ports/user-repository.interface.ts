import { User } from '../../../domain/entities/user.entity';

export abstract class IUserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract findByDocument(document: string): Promise<User | null>;
}
