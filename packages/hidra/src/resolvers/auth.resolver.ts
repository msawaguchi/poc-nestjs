import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { AuthInput } from '../inputs/auth.input';
import { AuthType } from '../common/auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      customer: response.customer,
      token: response.token,
    };
  }
}
