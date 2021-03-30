import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { AuthInput } from './auth.input';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const customer = await this.customerService.findByEmail(data.email);

    const token = await this.jwtToken(customer);

    return {
      customer,
      token,
    };
  }

  private async jwtToken(user: Customer): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
