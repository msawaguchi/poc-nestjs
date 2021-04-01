import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerInput {
  @Field()
  readonly id: string;
  @Field()
  readonly email: string;
  @Field()
  readonly name: string;
  @Field()
  readonly street: string;
  @Field()
  readonly city: string;
  @Field()
  readonly state: string;
  @Field()
  readonly ignite?: string;
  @Field()
  readonly experts?: string;
}

@InputType()
export class CustomerPagination {
  @Field()
  readonly limit?: number;
  @Field()
  readonly page?: number;
}
