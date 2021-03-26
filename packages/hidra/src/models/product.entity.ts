import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('amount')
  amount: string;

  @Column('type')
  type: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
