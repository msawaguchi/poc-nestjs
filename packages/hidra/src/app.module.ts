import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth.module';
import { CustomerModule } from './modules/customer.module';
import { ProductModule } from './modules/product.module';
import { PurchaseModule } from './modules/purchase.module';
import { KafkaService } from './services/kafka.service';
import { PurchaseController } from './controllers/purchase.controller';

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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.model.js'],
      synchronize: false,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [PurchaseController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
