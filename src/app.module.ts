import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence.module';
import { BalanceModule } from './Balance/balance.module';
import { RedemptionModule } from './Redemption/redemption.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    BalanceModule,
    RedemptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
