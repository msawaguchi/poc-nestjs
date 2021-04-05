import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { Product } from './product.model';

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
