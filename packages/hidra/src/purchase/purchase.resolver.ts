import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Customer } from './../customer/customer.model';
import { Product } from './../product/product.model';

import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.model';
import { DeletePurchaseInput, PurchaseInput } from './purchase.input';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    @Inject(PurchaseService) private purchaseService: PurchaseService,
  ) {}

  @Query(() => Purchase)
  async purchase(@Args('id') id: string): Promise<Purchase> {
    return await this.purchaseService.findOne(id);
  }

  @ResolveField(() => Customer)
  async customer(@Parent() customer) {
    const { customer_id } = customer;
    return this.purchaseService.findByCustomer(customer_id);
  }

  @ResolveField(() => Product)
  async product(@Parent() product) {
    const { product_id } = product;
    return this.purchaseService.findByProduct(product_id);
  }

  @Query(() => [Purchase])
  async purchases(): Promise<Purchase[]> {
    return await this.purchaseService.findAll();
  }

  @Mutation(() => Purchase)
  async createPurchase(
    @Args('purchase') purchase: PurchaseInput,
  ): Promise<Purchase> {
    return await this.purchaseService.create(purchase);
  }

  @Mutation(() => Purchase)
  async refund(@Args('refund') refund: DeletePurchaseInput): Promise<void> {
    return await this.purchaseService.refund({
      customer_id: refund.customer_id,
      id: refund.id,
    });
  }
}
