import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productService: Repository<Product>,
  ) {}

  create(data: ProductInput): Promise<Product> {
    return this.productService.save(data);
  }

  findAll(): Promise<Product[]> {
    return this.productService.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productService.findOne(id);
  }
}
