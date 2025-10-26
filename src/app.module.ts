import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence.module';
import { BalanceModule } from './Balance/balance.module';
import { RedemptionModule } from './Redemption/redemption.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    BalanceModule,
    RedemptionModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
