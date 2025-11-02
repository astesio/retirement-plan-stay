import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'redemptions' })
export class RedemptionTypeOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_Id' })
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ default: 'APPROVED' })
  status: string;

  @CreateDateColumn({ name: 'request_date' })
  requestDate: Date;
}
