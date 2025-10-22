import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepositoryInterface } from '../ports/user-repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { UserTypeOrmEntity } from '../entities/user.typeorm.entity';

const toDomainEntity = (typeOrmEntity: UserTypeOrmEntity): User => {
  return User.create(typeOrmEntity.name, typeOrmEntity.document);
};

const toTypeOrmEntity = (domainEntity: User): UserTypeOrmEntity => {
  const typeOrmEntity = new UserTypeOrmEntity();

  typeOrmEntity.id = domainEntity.id;
  typeOrmEntity.name = domainEntity.name;
  typeOrmEntity.document = domainEntity.document;

  return typeOrmEntity;
};

@Injectable()
export class PostgresUserRepository implements IUserRepositoryInterface {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly repository: Repository<UserTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const typeOrmUser = await this.repository.findOneBy({ id });

    if (!typeOrmUser) {
      return null;
    }

    return toDomainEntity(typeOrmUser);
  }

  async save(user: User): Promise<User> {
    const typeOrmEntity = toTypeOrmEntity(user);
    const savedEntity = await this.repository.save(typeOrmEntity);
    return toDomainEntity(savedEntity);
  }
}
