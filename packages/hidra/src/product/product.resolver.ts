import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Purchase } from './../purchase/purchase.model';
import { PurchaseService } from './../purchase/purchase.service';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ProductInput } from './product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(PurchaseService) private purchaseService: PurchaseService,
  ) {}

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @ResolveField(() => [Purchase])
  async purchases(@Parent() product) {
    const { id } = product;
    return this.purchaseService.findByProduct(id);
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: ProductInput): Promise<Product> {
    return await this.productService.create(data);
  }
}
