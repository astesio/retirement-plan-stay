import { Redemption } from '../../../../src/Redemption/redemption.entity';
import { Contribution } from '../../../../src/domain/entities/contribution';

export interface IContributionRepository {
  findByUserId(userId: string): Promise<Contribution[]>;
  saveRedemption(redemption: Redemption): Promise<void>;
}
