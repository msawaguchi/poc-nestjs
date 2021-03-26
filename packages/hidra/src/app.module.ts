import { Module } from '@nestjs/common';
import { AppController } from './purchases.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { CustomersService } from './customers/customers.service';
import { PurchaseService } from './purchase/purchase.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProductService, CustomersService, PurchaseService],
})
export class AppModule {}
