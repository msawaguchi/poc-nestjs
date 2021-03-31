import { PurchaseModule } from './../purchase/purchase.module';
import { Customer } from './customer.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [
    forwardRef(() => PurchaseModule),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
