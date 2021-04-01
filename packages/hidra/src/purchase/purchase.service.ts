import { Injectable, Inject } from '@nestjs/common';
import { Purchase } from './purchase.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerService } from './../customer/customer.service';
import { DeletePurchaseInput, PurchaseInput } from './purchase.input';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}

  async create(data: PurchaseInput): Promise<Purchase> {
    const purchase = await this.purchaseRepository.create({
      id: data.id,
      customer_id: data.customer_id,
      product_id: data.product_id,
      status: 'success',
    });

    this.purchaseRepository.save(purchase);

    return purchase;
  }

  async refund(data: DeletePurchaseInput): Promise<void> {
    const customer = await this.customerService.findOne(data.customer_id);

    const purchase = await this.purchaseRepository.findOne({
      where: {
        customer_id: data.customer_id,
        id: data.id,
      },
    });

    if (!purchase) {
      throw new Error('This purchase does not exists');
    }

    purchase.product_id === 'ignite'
      ? (customer.ignite = 'no-access')
      : (customer.experts_club = 'no-access');

    purchase.status = 'canceled';

    this.customerService.save(customer);
    this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    const purchases = await this.purchaseRepository.find();

    console.log(purchases);
    return purchases;
  }

  findByCustomer(id: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({ where: { customer_id: id } });
  }

  findByProduct(id: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({ where: { product_id: id } });
  }

  findOne(id: string): Promise<Purchase> {
    return this.purchaseRepository.findOne(id);
  }
}
