import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserController } from './infra/http/user.controller';
import { IUserRepository } from '../infra/persistence/ports/user-repository.interface';
import { USER_REPO_TOKEN } from '../infra/persistence.module';
import { FindAllUsersUseCase } from './use-cases/find-all-users.usecase';
import { FindUserById } from './use-cases/find-user-by-id.usecase';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (repo: IUserRepository) => {
        return new CreateUserUseCase(repo);
      },
      inject: [USER_REPO_TOKEN],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (repo: IUserRepository) => {
        return new FindAllUsersUseCase(repo);
      },
      inject: [USER_REPO_TOKEN],
    },
    {
      provide: FindUserById,
      useFactory: (repo: IUserRepository) => {
        return new FindUserById(repo);
      },
      inject: [USER_REPO_TOKEN],
    },
  ],
})
export class UserModule {}
