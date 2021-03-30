import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field()
  readonly id: string;
  @Field()
  readonly amount: number;
  @Field()
  readonly type: string;
}
