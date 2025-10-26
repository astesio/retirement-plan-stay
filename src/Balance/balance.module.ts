import { Module } from '@nestjs/common';
import { BalanceController } from './infra/http/balance.controller';
import { ConsultBalanceUseCase } from './use-cases/consult-balance.usecase';
import { IContributionRepository } from '../../src/infra/persistence/ports/contribution-repository.interface';
import {
  CONTRIBUTION_REPO_TOKEN,
  PersistenceModule,
  USER_REPO_TOKEN,
} from '../infra/persistence.module';
import { IUserRepository } from '../infra/persistence/ports/user-repository.interface';

@Module({
  imports: [PersistenceModule],
  controllers: [BalanceController],
  providers: [
    {
      provide: ConsultBalanceUseCase,
      useFactory: (
        contributionRepo: IContributionRepository,
        userRepo: IUserRepository,
      ) => new ConsultBalanceUseCase(contributionRepo, userRepo),
      inject: [CONTRIBUTION_REPO_TOKEN, USER_REPO_TOKEN],
    },
  ],
  exports: [ConsultBalanceUseCase],
})
export class BalanceModule {}
