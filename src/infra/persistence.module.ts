import { Global, Module } from '@nestjs/common';
// import { InMemoryContributionRepository } from './persistence/repositories/in-memory-contribution.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContributionTypeOrmEntity } from './persistence/entities/contribution.typeorm.entity';
import { PostgresContributionRepository } from './persistence/repositories/postgres-contribution.repository';
import { UserTypeOrmEntity } from './persistence/entities/user.typeorm.entity';
import { PostgresUserRepository } from './persistence/repositories/postgres-user.repository';

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
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [ContributionTypeOrmEntity, UserTypeOrmEntity],
          synchronize: true, // Apenas para DEV! Em PROD, usar o Migrations
        };
      },
    }),
    TypeOrmModule.forFeature([ContributionTypeOrmEntity, UserTypeOrmEntity]),
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
