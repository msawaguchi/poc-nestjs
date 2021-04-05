import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private customerService: CustomerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'quemroubouopaonacasadojoao',
    });
  }

  async validate(payload: { sub: Customer['id']; name: string }) {
    const user = this.customerService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
