import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface Iproduct {
  id: string;
  amount: string;
  type: string;
}

@Injectable()
export class ProductService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onCreate(product: Iproduct) {
    const prisma = new PrismaClient();

    const existProduct = await prisma.products.findFirst({
      where: {
        product_name: product.id,
      },
    });

    if (existProduct) {
      return existProduct.id;
    }

    try {
      const newProduct = await prisma.products.create({
        data: {
          id: uuidv4(),
          product_name: product.id,
          amount: product.amount,
          type: product.type,
        },
      });
      return newProduct.id;
    } catch (err) {
      console.log(err);
    }
  }
}
