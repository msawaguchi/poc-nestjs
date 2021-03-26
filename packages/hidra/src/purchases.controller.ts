/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product/product.service';
import { CustomersService } from './customers/customers.service';
import { PurchaseService } from './purchase/purchase.service';

// interface KafkaResponse {
//   id: string,
//   customer: {
//     id: string,
//     name: string,
//     email: string,
//     address: { street: string, city: string, state: string }
//   },
//   product: { id: string, amount: number, type: string },
//   createdAt: string
// }

@Controller()
export class AppController {
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
  //     }
  //   }
  // })

  // private client: ClientKafka;

  // async onModuleInit() {
  //   const requestPatters = ['ignite', 'experts'];

  //   requestPatters.forEach(async pattern => {
  //     this.client.subscribeToResponseOf(pattern);
  //     await this.client.connect();
  //   })
  // }

  constructor(
    private readonly productService: ProductService,
    private readonly customersService: CustomersService,
    private readonly purchaseService: PurchaseService
  ) {}

  @MessagePattern('hidra.purchase') // Our topic name
  async getPurchase(@Payload() message) {
    console.log(message.value);

    const productId = await this.productService.onCreate(message.value.product);
    const customerId = await this.customersService.onCreate(message.value.customer);
    await this.purchaseService.onCreate({
      id: message.value.id,
      customer_id: customerId,
      product_id: productId,
    })

    return 'Hello World';
  }
}
