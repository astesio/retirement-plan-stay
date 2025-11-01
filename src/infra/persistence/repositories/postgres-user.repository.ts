// todo: for organizatino imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../ports/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserTypeOrmEntity } from '../entities/user.typeorm.entity';

const toDomainEntity = (typeOrmEntity: UserTypeOrmEntity): User => {
  return User.with({
    id: typeOrmEntity.id,
    name: typeOrmEntity.name,
    document: typeOrmEntity.document,
  });
};

const toTypeOrmEntity = (domainEntity: User): UserTypeOrmEntity => {
  const typeOrmEntity = new UserTypeOrmEntity();

  typeOrmEntity.id = domainEntity.id;
  typeOrmEntity.name = domainEntity.name;
  typeOrmEntity.document = domainEntity.document;

  return typeOrmEntity;
};

@Injectable() // todo: find some way to inject module without decorator
export class PostgresUserRepository implements IUserRepository {
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

  async findByDocument(document: string): Promise<User | null> {
    const typeOrmUser = await this.repository.findOneBy({ document });

    if (!typeOrmUser) {
      return null;
    }

    return toDomainEntity(typeOrmUser);
  }

  async findAllUsers(): Promise<User[] | null> {
    const typeOrmUsers = await this.repository.find();
    return typeOrmUsers.map(toDomainEntity);
  }

  async save(user: User): Promise<User> {
    const typeOrmEntity = toTypeOrmEntity(user);
    const savedEntity = await this.repository.save(typeOrmEntity);
    return toDomainEntity(savedEntity);
  }
}
