import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './infra/persistence.module';
import { BalanceModule } from './Balance/balance.module';

@Module({
  imports: [PersistenceModule, BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
