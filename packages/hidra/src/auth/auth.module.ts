import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'quemroubouopaonacasadojoao',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, CustomerService, JwtStrategy],
})
export class AuthModule {}
