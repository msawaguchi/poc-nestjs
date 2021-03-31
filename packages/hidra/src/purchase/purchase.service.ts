import { Injectable } from '@nestjs/common';
import { Purchase } from './purchase.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeletePurchaseInput, PurchaseInput } from './purchase.input';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  create(data: PurchaseInput): Promise<Purchase> {
    return this.purchaseRepository.save({
      id: data.id,
      customer_id: data.customer_id,
      product_id: data.product_id,
      status: 'success',
    });
  }

  async refund(data: DeletePurchaseInput): Promise<void> {
    const purchase = await this.purchaseRepository.findOne(data.id);

    if (!purchase) {
      throw new Error('This purchase does not exists');
    }

    purchase.status = 'canceled';

    this.purchaseRepository.save(purchase);
  }

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
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
