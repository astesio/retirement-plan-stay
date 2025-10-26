import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserController } from './infra/http/user.controller';
import { IUserRepository } from '../infra/persistence/ports/user-repository.interface';
import { USER_REPO_TOKEN } from '../infra/persistence.module';

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
  ],
})
export class UserModule {}
