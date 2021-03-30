import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field()
  readonly email: string;
}
