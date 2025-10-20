import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence.module';
import { BalanceModule } from './Balance/balance.module';
import { RedemptionModule } from './Redemption/redemption.module';

@Module({
  imports: [PersistenceModule, BalanceModule, RedemptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
