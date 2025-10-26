import { Either, left, right } from '../../core/either';
import { IUsecase } from '../../core/usecase.interface';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { IUserRepository } from '../../infra/persistence/ports/user-repository.interface';

export type RequestUser = { name: string; document: string };
export type ResponseUser = Either<UserAlreadyExistsError, User>;

export class CreateUserUseCase implements IUsecase<RequestUser, ResponseUser> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ name, document }: RequestUser): Promise<ResponseUser> {
    const existingUser = await this.userRepository.findByDocument(document);
    if (existingUser) {
      return left(new UserAlreadyExistsError(document));
    }

    const newUser = User.create(name, document);
    const savedUser = await this.userRepository.save(newUser);
    return right(savedUser);
  }
}
