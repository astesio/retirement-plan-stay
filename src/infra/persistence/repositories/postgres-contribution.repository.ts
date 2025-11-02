import { Injectable } from '@nestjs/common';
import {
  Contribution,
  ConsumedContribution,
} from '../../../domain/entities/contribution.entity';
import { Redemption } from '../../../Redemption/entity/redemption.entity';
import { ContributionTypeOrmEntity } from '../entities/contribution.typeorm.entity';
import { IContributionRepository } from '../ports/contribution-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RedemptionTypeOrmEntity } from '../entities/redemption.typeorm.entity';

const toDomainEntity = (
  typeOrmEntity: ContributionTypeOrmEntity,
): Contribution => {
  // criar o campo redeemedValue na entity
  return Contribution.with(
    typeOrmEntity.id,
    typeOrmEntity.userId,
    typeOrmEntity.value,
    typeOrmEntity.redeemedValue,
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
  typeOrmEntity.redeemedValue = domainEntity.redeemedValue;
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

  async findAvailableByUserId(userId: string): Promise<Contribution[]> {
    const today = new Date();
    const typeOrmContributions = await this.repository.find({
      where: {
        userId,
        vestingDate: today,
      },
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

  async saveRedemption(
    redemption: Redemption,
    contributionsToUpdate: ConsumedContribution[],
  ): Promise<void> {
    await this.repository.manager.transaction(
      async (manager: EntityManager) => {
        // atualizar a tabela de desenho para refletir os campos iugal do orm entity
        const redemptionRepo = manager.getRepository(RedemptionTypeOrmEntity);

        for (const update of contributionsToUpdate) {
          const contributionEntity = await manager.findOneBy(
            ContributionTypeOrmEntity,
            { id: update.id },
          );

          if (contributionEntity) {
            contributionEntity.redeemedValue += update.consumedValue;
            await manager.save(ContributionTypeOrmEntity, contributionEntity);
          }
        }

        const redemptionEntity = redemptionRepo.create({
          id: redemption.id,
          userId: redemption.userId,
          value: redemption.value,
          requestDate: new Date(),
          status: 'APPROVED',
        });

        await redemptionRepo.save(redemptionEntity);

        console.log(
          `[DB] transação de Resgate de ${redemption.value} para o usuário ${redemption.userId} concluída com sucesso.`,
        );
      },
    );

    // faltou implementar o resgate
    console.log(
      `[DB] Executando TRANSAÇÃO para resgate de ${redemption.value} do usuário ${redemption.userId}`,
    );
  }
}
