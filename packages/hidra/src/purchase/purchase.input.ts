import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PurchaseInput {
  @Field()
  readonly id: string;
  @Field()
  readonly customer_id: string;
  @Field()
  readonly product_id: string;
}

@InputType()
export class DeletePurchaseInput {
  @Field()
  readonly id: string;
}
