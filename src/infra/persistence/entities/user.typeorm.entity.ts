import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContributionTypeOrmEntity } from './contribution.typeorm.entity';

@Entity({ name: 'users' })
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  document: string;

  @OneToMany(
    () => ContributionTypeOrmEntity,
    (contribution) => contribution.user,
  )
  contributions: ContributionTypeOrmEntity[];
}
