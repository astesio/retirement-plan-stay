import { Contribution } from 'src/domain/entities/contribution';
import { Redemption } from '../../../../src/Redemption/redemption.entity';

export interface IContributionRepository {
  findByUserId(userId: string): Promise<Contribution[]>;
  saveRedemption(redemption: Redemption): Promise<void>;
}
