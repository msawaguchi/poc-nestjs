import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthResolver } from '../resolvers/auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/jwt.strategy';

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
