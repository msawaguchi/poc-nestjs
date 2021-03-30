import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

import { Purchase } from './../purchase/purchase.model';
import { PurchaseService } from './../purchase/purchase.service';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { CustomerInput, CustomerPagination } from './customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(PurchaseService) private purchaseService: PurchaseService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Customer, { nullable: true })
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.customerService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => [Purchase])
  async purchases(@Parent() customer) {
    const { id } = customer;
    return this.purchaseService.findByCustomer(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Customer])
  async customers(@Args('data') data: CustomerPagination): Promise<Customer[]> {
    return await this.customerService.findAll(data.limit, data.page);
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('data') data: CustomerInput): Promise<Customer> {
    return await this.customerService.create(data);
  }
}
