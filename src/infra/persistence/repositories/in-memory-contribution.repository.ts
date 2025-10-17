/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Contribution } from '../../../../src/domain/entities/contribution';
import { Redemption } from '../../../../src/Redemption/redemption.entity';
import { IContributionRepository } from '../ports/contribution-repository.interface';

const MOCKED_CONTRIBUTIONS: Contribution[] = [
  Contribution.create(
    'user-chatbot-123',
    200,
    new Date('2023-01-01'),
    new Date('2023-06-01'),
  ),
  Contribution.create(
    'user-chatbot-123',
    100,
    new Date('2024-01-01'),
    new Date('2027-01-01'),
  ),
];

@Injectable()
export class InMemoryContributionRepository implements IContributionRepository {
  private contributions: Contribution[] = MOCKED_CONTRIBUTIONS;
  private redemptions: Redemption[] = [];

  async findByUserId(userId: string): Promise<Contribution[]> {
    return this.contributions.filter((c) => c.userId === userId);
  }

  async saveRedemption(redemption: Redemption): Promise<void> {
    this.redemptions.push(redemption);
    console.log(
      `[IN-MEMORY MOCK] Resgate de ${redemption.value} registrado com status: ${redemption.status}. 
      Total de resgates: ${this.redemptions.length}`,
    );
  }
}
