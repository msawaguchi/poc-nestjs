import { PurchaseModule } from './../purchase/purchase.module';
import { Product } from './product.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    forwardRef(() => PurchaseModule),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
