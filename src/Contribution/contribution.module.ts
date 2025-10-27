import { Module } from '@nestjs/common';
import { IContributionRepository } from '../../src/infra/persistence/ports/contribution-repository.interface';
import {
  CONTRIBUTION_REPO_TOKEN,
  PersistenceModule,
  USER_REPO_TOKEN,
} from '../infra/persistence.module';
import { IUserRepository } from '../infra/persistence/ports/user-repository.interface';
import { ContributionController } from './infra/http/contribution.controller';
import { RegisterContributionUseCase } from './use-cases/register-contribution.usecase';

@Module({
  imports: [PersistenceModule],
  controllers: [ContributionController],
  providers: [
    {
      provide: RegisterContributionUseCase,
      useFactory: (
        contributionRepo: IContributionRepository,
        userRepo: IUserRepository,
      ) => new RegisterContributionUseCase(contributionRepo, userRepo),
      inject: [CONTRIBUTION_REPO_TOKEN, USER_REPO_TOKEN],
    },
  ],
})
export class ContributionModule {}
