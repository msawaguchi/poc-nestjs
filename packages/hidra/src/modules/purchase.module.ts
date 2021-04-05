import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CustomerModule } from './customer.module';
import { ProductModule } from './product.module';

import { KafkaService } from '../services/kafka.service';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseController } from '../controllers/purchase.controller';
import { PurchaseResolver } from '../resolvers/purchase.resolver';
import { Purchase } from '../models/purchase.model';

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
