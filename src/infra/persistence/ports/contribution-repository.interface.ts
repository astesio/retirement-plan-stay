import {
  Contribution,
  ConsumedContribution,
} from 'src/domain/entities/contribution.entity';
import { Redemption } from '../../../Redemption/entity/redemption.entity';

export interface IContributionRepository {
  findByUserId(userId: string): Promise<Contribution[]>;
  findAvailableByUserId(userId: string): Promise<Contribution[]>;
  save(contribution: Contribution): Promise<Contribution>;
  saveRedemption(
    redemption: Redemption,
    contributionsToUpdate: ConsumedContribution[],
  ): Promise<void>;
}
