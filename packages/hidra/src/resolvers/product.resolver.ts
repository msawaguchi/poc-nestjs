import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../common/jwt-auth.guard';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
