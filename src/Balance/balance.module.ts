import { Module } from '@nestjs/common';
import { BalanceController } from './infra/http/balance.controller';
import { ConsultBalanceUseCase } from './use-cases/consult-balance.usecase';
import { IContributionRepository } from '../../src/infra/persistence/ports/contribution-repository.interface';
import { CONTRIBUTION_REPO_TOKEN } from '../infra/persistence.module';

@Module({
  controllers: [BalanceController],
  providers: [
    {
      provide: ConsultBalanceUseCase,
      useFactory: (repo: IContributionRepository) =>
        new ConsultBalanceUseCase(repo),
      inject: [CONTRIBUTION_REPO_TOKEN],
    },
  ],
  exports: [ConsultBalanceUseCase],
})
export class BalanceModule {}
