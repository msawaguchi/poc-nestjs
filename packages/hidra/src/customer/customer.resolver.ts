import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { CustomerInput, CustomerPagination } from './customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Customer, { nullable: true })
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.customerService.findOne(id);
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
