import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.model';
import { Repository } from 'typeorm';
import { CustomerInput } from './customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerService: Repository<Customer>,
  ) {}

  create(data: CustomerInput): Promise<Customer> {
    return this.customerService.save(data);
  }

  async findAll(limit = 10, page = 1): Promise<Customer[]> {
    const customers = await this.customerService.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return customers;
  }

  findOne(id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  findByEmail(email: string): Promise<Customer> {
    return this.customerService.findOne({ where: { email } });
  }
}
