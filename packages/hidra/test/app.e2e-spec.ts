import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductInput } from '../src/product/product.input';
import { INestApplication } from '@nestjs/common';
import { ProductService } from '../src/product/product.service';

const products: ProductInput[] = [
  {
    id: 'ignite',
    amount: 1980,
    type: 'onetime',
  },
  {
    id: 'experts',
    amount: 70,
    type: 'onetime',
  },
];

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const productsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductService)
      .useValue(productsService)
      .compile();

    app = await moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get the products array', () => {
    console.log(app);
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{products { id type amount }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.products).toEqual(products);
      });
  });
});
