/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { IContributionRepository } from '../ports/contribution-repository.interface';
import { Contribution } from '../../../domain/entities/contribution.entity';
import { Redemption } from '../../../Redemption/entity/redemption.entity';

const MOCKED_CONTRIBUTIONS: Contribution[] = [
  Contribution.create(
    '069c953b-7dc3-4916-bddd-bcacbdc9039b',
    200,
    new Date('2023-01-01'),
    new Date('2023-06-01'),
  ),
  Contribution.create(
    'b5fb8f8d-1cff-46b8-81f9-a63e09a67a60',
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

  async save(contribution: Contribution): Promise<Contribution> {
    this.contributions.push(contribution);
    return contribution;
  }

  // melhorar o saveRedemption, implemntar um caso mais real para o em memory
  async saveRedemption(redemption: Redemption): Promise<void> {
    this.redemptions.push(redemption);
    console.log(
      `[IN-MEMORY MOCK] Resgate de ${redemption.value} registrado com status: ${redemption.status}. 
      Total de resgates: ${this.redemptions.length}`,
    );
  }
}
