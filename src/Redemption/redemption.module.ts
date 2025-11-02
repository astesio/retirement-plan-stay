import { Module } from '@nestjs/common';
import { RedemptionController } from './infra/http/redemption.controller';
import { RequestRedemptionUseCase } from './use-cases/request-redemption.usecase';
import { IContributionRepository } from '../infra/persistence/ports/contribution-repository.interface';
import { ConsultBalanceUseCase } from '../Balance/use-cases/consult-balance.usecase';
import { BalanceModule } from '../Balance/balance.module';
import {
  CONTRIBUTION_REPO_TOKEN,
  USER_REPO_TOKEN,
} from '../infra/persistence.module';
import { IUserRepository } from '../infra/persistence/ports/user-repository.interface';

@Module({
  imports: [BalanceModule],
  controllers: [RedemptionController],
  providers: [
    {
      provide: RequestRedemptionUseCase,
      useFactory: (
        contributionRepository: IContributionRepository,
        userRepository: IUserRepository,
        consultBalance: ConsultBalanceUseCase,
      ) => {
        return new RequestRedemptionUseCase(
          contributionRepository,
          userRepository,
          consultBalance,
        );
      },
      inject: [CONTRIBUTION_REPO_TOKEN, USER_REPO_TOKEN, ConsultBalanceUseCase],
    },
  ],
})
export class RedemptionModule {}
