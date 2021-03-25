/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

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

  constructor(private readonly appService: AppService) {}

  @MessagePattern('hidra.purchase') // Our topic name
  getPurchase(@Payload() message) {
    console.log(message.value);
    return 'Hello World';
  }
}
