import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface ICustomers {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

@Injectable()
export class CustomersService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onCreate(customer: ICustomers) {
    const prisma = new PrismaClient();

    const existCustomer = await prisma.customers.findFirst({
      where: {
        email: customer.email,
      },
    });

    if (existCustomer) {
      return existCustomer.id;
    }

    try {
      const customerId = await prisma.customers.create({
        data: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          street: customer.address.street,
          city: customer.address.city,
          state: customer.address.state,
        },
      });

      return customerId.id;
    } catch (err) {
      console.log(err);
    }
  }
}
