import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase/purchase.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { GraphQLModule } from '@nestjs/graphql';
import { KafkaService } from './purchase/kafka.service';

@Module({
  imports: [
    AuthModule,
    CustomerModule,
    ProductModule,
    PurchaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'hidra',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [PurchaseController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
