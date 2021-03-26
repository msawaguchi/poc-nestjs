import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface IPurchase {
  id: string;
  customer_id: string;
  product_id: string;
}

@Injectable()
export class PurchaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onCreate(purchase: IPurchase) {
    const prisma = new PrismaClient();

    try {
      await prisma.purchases.create({
        data: {
          id: purchase.id,
          product_id: purchase.product_id,
          customer_id: purchase.customer_id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
