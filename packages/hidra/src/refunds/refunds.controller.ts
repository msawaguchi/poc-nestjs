import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('refunds')
export class RefundsController {
  @MessagePattern('hidra.refunds') // Our topic name
  getRefunds(@Payload() message) {
    return message.value;
  }
}
