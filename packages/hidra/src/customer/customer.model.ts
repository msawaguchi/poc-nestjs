import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Purchase } from '../purchase/purchase.model';

@ObjectType()
@Entity({ name: 'customers' })
export class Customer {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

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
