import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

export interface CreateProductDto {
  amount: string;
  type: number;
}

@Controller('products')
export class ProductController {
  constructor(private readonly productServices: ProductService) {}

  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productServices.create(createProduct);
  }

  @Get()
  findAll() {
    return this.productServices.findAll();
  }
}
