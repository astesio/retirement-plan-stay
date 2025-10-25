import { Contribution } from 'src/domain/entities/contribution.entity';
import { Redemption } from '../../../Redemption/entity/redemption.entity';

export interface IContributionRepository {
  findByUserId(userId: string): Promise<Contribution[]>;
  save(contribution: Contribution): Promise<Contribution>;
  saveRedemption(redemption: Redemption): Promise<void>;
}
