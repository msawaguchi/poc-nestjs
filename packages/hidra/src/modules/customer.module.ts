import { PurchaseModule } from '../modules/purchase.module';
import { Customer } from '../models/customer.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerResolver } from '../resolvers/customer.resolver';

@Module({
  imports: [
    forwardRef(() => PurchaseModule),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
