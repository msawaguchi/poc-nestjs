import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.model';
import { DeletePurchaseInput } from './purchase.input';
import { KafkaService } from './kafka.service';
import { KafkaPayload } from './kafka.message';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    @Inject(PurchaseService) private purchaseService: PurchaseService,
    @Inject(KafkaService) private readonly kafkaService: KafkaService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Purchase)
  async purchase(@Args('id') id: string): Promise<Purchase> {
    return await this.purchaseService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Purchase])
  async purchaseByCustomer(@Args('customer_id') customer_id: string) {
    return this.purchaseService.findByCustomer(customer_id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Purchase])
  async purchaseByProduct(@Args('product_id') product_id: string) {
    return this.purchaseService.findByProduct(product_id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Purchase])
  async purchases(): Promise<Purchase[]> {
    return await this.purchaseService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Purchase)
  async getRefund(
    @Args('refund') refundData: DeletePurchaseInput,
  ): Promise<Purchase> {
    const purchase = await this.purchaseService.findOne(refundData.id);

    const refund = await this.purchaseService.refund({
      customer_id: refundData.customer_id,
      id: refundData.id,
    });

    if (!purchase) {
      throw new Error('This purchase does not exists');
    }

    try {
      const payload: KafkaPayload = {
        body: `Reembolso realizado, acesso ao cliente: ${purchase.customer_id} foi retirado`,
        messageType: 'Refund',
        topicName: purchase.product_id,
      };

      await this.kafkaService.sendMessage(purchase.product_id, payload);
    } catch (err) {
      throw new Error('Houve um erro ao enviar mensagem para o Kafka');
    }

    return refund;
  }
}
