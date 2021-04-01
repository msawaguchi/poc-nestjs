import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';

import { ProductService } from '../product/product.service';
import { PurchaseService } from './purchase.service';
import { CustomerService } from '../customer/customer.service';

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

@Controller()
export class PurchaseController {
  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'ignite',
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'ignite-consumer',
  //       allowAutoTopicCreation: true,
  //     },
  //   },
  // })

  // private client: ClientKafka;

  // async onModuleInit() {
  //   const requestPatters = ['ignite', 'experts'];

  //   requestPatters.forEach(async pattern => {
  //     this.client.subscribeToResponseOf(pattern);
  //     await this.client.connect();
  //   })
  // }
  private kafka: Kafka;

  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(ProductService) private productService: ProductService,
    @Inject(PurchaseService) private purchaseService: PurchaseService,
  ) {
    this.kafka = new Kafka({
      clientId: 'sample-producer',
      brokers: ['localhost:9092'],
    });
  }

  @MessagePattern('hidra.purchase') // Our topic name
  @MessagePattern('ignite') // Our topic name
  async getPurchase(@Payload() message: Purchase) {
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
        experts: message.value.product.id === 'experts' ? 'access' : '',
        ignite: message.value.product.id === 'ignite' ? 'access' : '',
      });
    }

    this.purchaseService.create({
      id: message.value.id,
      customer_id: message.value.customer.id,
      product_id: message.value.product.id,
      status: 'success',
    });

    try {
      await this.kafka.producer().connect();
      await this.kafka.producer().send({
        topic: 'ignite',
        messages: [{ value: 'Compra realizada' }],
      });
    } catch (err) {
      console.log(err);
    }
  }
}
