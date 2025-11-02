import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTypeOrmEntity } from './persistence/entities/user.typeorm.entity';
import { ContributionTypeOrmEntity } from './persistence/entities/contribution.typeorm.entity';
import { PostgresUserRepository } from './persistence/repositories/postgres-user.repository';
import { PostgresContributionRepository } from './persistence/repositories/postgres-contribution.repository';
import { RedemptionTypeOrmEntity } from './persistence/entities/redemption.typeorm.entity';
// import { InMemoryContributionRepository } from './persistence/repositories/in-memory-contribution.repository';

export const CONTRIBUTION_REPO_TOKEN = 'IContributionRepository';
export const USER_REPO_TOKEN = 'IUserRepository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_NAME'),
          entities: [
            ContributionTypeOrmEntity,
            UserTypeOrmEntity,
            RedemptionTypeOrmEntity,
          ],
          synchronize: true, // Apenas para DEV! Em PROD, usar o Migrations
          autoLoadEntities: true, // loggin true, para ver as queries geradas
        };
      },
    }),
    TypeOrmModule.forFeature([
      ContributionTypeOrmEntity,
      UserTypeOrmEntity,
      RedemptionTypeOrmEntity,
    ]),
  ],
  providers: [
    {
      provide: CONTRIBUTION_REPO_TOKEN,
      // useClass: InMemoryContributionRepository,
      useClass: PostgresContributionRepository,
    },
    {
      provide: USER_REPO_TOKEN,
      useClass: PostgresUserRepository,
    },
  ],
  exports: [CONTRIBUTION_REPO_TOKEN, USER_REPO_TOKEN],
})
export class PersistenceModule {}
