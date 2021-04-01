import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

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

  @Query(() => [Purchase])
  async purchaseByCustomer(@Args('customer_id') customer_id: string) {
    return this.purchaseService.findByCustomer(customer_id);
  }

  @Query(() => [Purchase])
  async purchaseByProduct(@Args('product_id') product_id: string) {
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
