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
