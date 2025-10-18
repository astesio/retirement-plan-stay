import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence.module';
import { BalanceModule } from './Balance/balance.module';

@Module({
  imports: [PersistenceModule, BalanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
