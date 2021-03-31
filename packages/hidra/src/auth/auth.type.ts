import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../customer/customer.model';

@ObjectType()
export class AuthType {
  @Field(() => Customer)
  customer: Customer;
  @Field()
  token: string;
}
