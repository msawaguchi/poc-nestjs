import { PurchaseModule } from '../modules/purchase.module';
import { Product } from '../models/product.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductResolver } from '../resolvers/product.resolver';

@Module({
  imports: [
    forwardRef(() => PurchaseModule),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
