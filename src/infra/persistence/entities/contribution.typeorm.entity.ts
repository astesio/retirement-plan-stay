import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
