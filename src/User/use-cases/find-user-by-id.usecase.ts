import { Either, left, right } from '../../core/either';
import { IUsecase } from '../../core/usecase.interface';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { IUserRepository } from '../../infra/persistence/ports/user-repository.interface';

export type RequestUser = { userId: string };
export type ResponseUser = Either<UserAlreadyExistsError, User>;

export class FindUserById implements IUsecase<RequestUser, ResponseUser> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: RequestUser): Promise<ResponseUser> {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      return left(new UserNotFoundError(userId));
    }

    return right(existingUser);
  }
}
