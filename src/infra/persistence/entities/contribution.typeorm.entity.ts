import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeOrmEntity } from './user.typeorm.entity';

@Entity({ name: 'contributions' })
export class ContributionTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'timestamp with time zone', name: 'contribution_date' })
  contributionDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'vesting_date' })
  vestingDate: Date;

  @Column({ name: 'is_redeemed', default: false })
  isRedeemed: boolean;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.contributions)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;
}
