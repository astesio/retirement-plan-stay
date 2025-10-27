import { Injectable } from '@nestjs/common';
import { Contribution } from '../../../domain/entities/contribution.entity';
import { Redemption } from '../../../Redemption/entity/redemption.entity';
import { ContributionTypeOrmEntity } from '../entities/contribution.typeorm.entity';
import { IContributionRepository } from '../ports/contribution-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const toDomainEntity = (
  typeOrmEntity: ContributionTypeOrmEntity,
): Contribution => {
  return Contribution.with(
    typeOrmEntity.id,
    typeOrmEntity.userId,
    typeOrmEntity.value,
    typeOrmEntity.contributionDate,
    typeOrmEntity.vestingDate,
  );
};

const toTypeOrmEntity = (
  domainEntity: Contribution,
): ContributionTypeOrmEntity => {
  // todo: melhorar esse metodo
  const typeOrmEntity = new ContributionTypeOrmEntity();
  typeOrmEntity.id = domainEntity.id;
  typeOrmEntity.userId = domainEntity.userId;
  typeOrmEntity.value = domainEntity.value;
  typeOrmEntity.contributionDate = domainEntity.contributionDate;
  typeOrmEntity.vestingDate = domainEntity.vestingDate;

  return typeOrmEntity;
};

@Injectable()
export class PostgresContributionRepository implements IContributionRepository {
  constructor(
    @InjectRepository(ContributionTypeOrmEntity)
    private readonly repository: Repository<ContributionTypeOrmEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Contribution[]> {
    const typeOrmContributions = await this.repository.find({
      where: { userId },
      order: { contributionDate: 'ASC' },
    });

    if (typeOrmContributions.length === 0) {
      return [];
    }

    return typeOrmContributions.map(toDomainEntity);
  }

  async save(contribution: Contribution): Promise<Contribution> {
    const typeOrmEntity = toTypeOrmEntity(contribution); // aplicar isRedeemed na entity
    const savedEntity = await this.repository.save(typeOrmEntity);
    return toDomainEntity(savedEntity);
  }

  saveRedemption(redemption: Redemption): Promise<void> {
    // faltou implementar o resgate
    console.log(
      `[POSTGRES DB] Executando TRANSAÇÃO para resgate de ${redemption.value} do usuário ${redemption.userId}`,
    );
    throw new Error('Method not implemented.');
  }
}
