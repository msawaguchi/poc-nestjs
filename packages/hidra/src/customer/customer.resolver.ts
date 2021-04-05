import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { CustomerPagination } from './customer.input';

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
}
