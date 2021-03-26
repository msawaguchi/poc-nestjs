import { Module } from '@nestjs/common';
import Product from '../models/product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [Product],
  controllers: [],
  providers: [ProductService],
})
export class ProductModule {}
