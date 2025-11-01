import { IUsecase } from '../../core/usecase.interface';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../infra/persistence/ports/user-repository.interface';

export type ResponseUser = User[];

export class FindAllUsersUseCase implements IUsecase<void, ResponseUser> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<ResponseUser> {
    const users = await this.userRepository.findAllUsers();
    return users!;
  }
}
