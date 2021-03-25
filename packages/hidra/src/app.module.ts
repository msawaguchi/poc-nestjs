import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RefundsController } from './refunds/refunds.controller';
import { PurchasesController } from './purchases/purchases.controller';

@Module({
  imports: [],
  controllers: [AppController, RefundsController, PurchasesController],
  providers: [AppService],
});

@Module({
  imports: [Grap]
})
export class AppModule {}
