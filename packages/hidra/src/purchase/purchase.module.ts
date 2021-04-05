import { Purchase } from './purchase.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CustomerModule } from './../customer/customer.module';
import { ProductModule } from './../product/product.module';

import { PurchaseService } from './purchase.service';
import { KafkaService } from './kafka.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseResolver } from './purchase.resolver';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([Purchase]),
  ],
  providers: [
    PurchaseService,
    PurchaseResolver,
    PurchaseController,
    KafkaService,
  ],
  exports: [PurchaseService],
})
export class PurchaseModule {}
