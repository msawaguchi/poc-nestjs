import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../models/customer.model';

@ObjectType()
export class AuthType {
  @Field(() => Customer)
  customer: Customer;
  @Field()
  token: string;
}
