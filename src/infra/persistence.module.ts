import { Global, Module } from '@nestjs/common';
import { InMemoryContributionRepository } from './persistence/repositories/in-memory-contribution.repository';

export const CONTRIBUTION_REPO_TOKEN = 'IContributionRepository';

@Global()
@Module({
  providers: [
    {
      provide: CONTRIBUTION_REPO_TOKEN,
      useClass: InMemoryContributionRepository, // after create postgressRepo and can be change local or production inject
    },
  ],
  exports: [CONTRIBUTION_REPO_TOKEN],
})
export class PersistenceModule {}
