import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.controller';
import { getRepository } from 'typeorm';
import Product from '../models/product.entity';

@Injectable()
export class ProductService {
  private readonly products: CreateProductDto[] = [];

  create(product: CreateProductDto) {
    console.log(product);
    const productRepository = getRepository(Product);
    productRepository.create(product);
  }

  async findAll(): Promise<CreateProductDto[]> {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  }
}
