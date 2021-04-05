import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Purchase } from './purchase.model';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  type: string;

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Promise<Purchase[]>;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
