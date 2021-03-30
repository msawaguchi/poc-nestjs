import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Customer } from '../customer/customer.model';
import { Product } from '../product/product.model';

@ObjectType()
@Entity({ name: 'purchases' })
export class Purchase {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ name: 'customer_id' })
  customer_id: string;

  @Field()
  @Column({ name: 'product_id' })
  product_id: string;

  @Field()
  @Column()
  status: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.purchases)
  @JoinColumn({ name: 'customer_id' })
  customer: Promise<Customer>;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.purchases)
  @JoinColumn({ name: 'product_id' })
  product: Promise<Product>;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
