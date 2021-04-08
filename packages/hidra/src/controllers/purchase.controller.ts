import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductService } from '../services/product.service';
import { PurchaseService } from '../services/purchase.service';
import { CustomerService } from '../services/customer.service';
import { KafkaService } from '../services/kafka.service';
import { KafkaPayload } from '../common/kafka.message';

interface Purchase {
  value: {
    id: string;
    customer: {
      id: string;
      name: string;
      email: string;
      address: { street: string; city: string; state: string };
    };
    product: { id: string; amount: number; type: string };
    createdAt: string;
  };
}

interface Refund {
  topic: string;
  value: {
    id: string;
    purchaseId: string;
    createdAt: string;
  };
}

@Controller()
export class PurchaseController {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(ProductService) private productService: ProductService,
    @Inject(PurchaseService) private purchaseService: PurchaseService,
    @Inject(KafkaService) private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('hidra.purchase')
  async createPurchase(@Payload() message: Purchase) {
    const product = await this.productService.findOne(message.value.product.id);
    const customer = await this.customerService.findOne(
      message.value.customer.id,
    );

    if (!product) {
      await this.productService.create(message.value.product);
    }

    if (!customer) {
      await this.customerService.create({
        id: message.value.customer.id,
        name: message.value.customer.name,
        email: message.value.customer.email,
        city: message.value.customer.address.city,
        state: message.value.customer.address.state,
        street: message.value.customer.address.street,
        experts_club: message.value.product.id === 'experts' ? 'access' : '',
        ignite: message.value.product.id === 'ignite' ? 'access' : '',
      });
    }

    this.purchaseService.create({
      id: message.value.id,
      customer_id: message.value.customer.id,
      product_id: message.value.product.id,
    });

    try {
      const payload: KafkaPayload = {
        body: `Compra realizada, acesso concedido ao cliente: ${message.value.customer.id}`,
        messageType: 'Purchase',
        topicName: message.value.product.id,
      };

      await this.kafkaService.sendMessage(message.value.product.id, payload);
    } catch (err) {
      throw new Error('Houve um erro ao enviar mensagem para o Kafka');
    }
  }

  @MessagePattern('hidra.refund')
  async refundPurchase(@Payload() message: Refund) {
    const purchase = await this.purchaseService.findOne(
      message.value.purchaseId,
    );

    if (!purchase) {
      throw new Error('This purchase does not exists');
    }

    this.purchaseService.refund({
      id: message.value.purchaseId,
      customer_id: purchase.customer_id,
    });

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
  }
}
