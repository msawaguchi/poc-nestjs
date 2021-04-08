import { Connection, Repository } from 'typeorm';

import { typeormHelper } from '../../test/utils/typeormHelper';

import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { Customer } from '../models/customer.model';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productRepository: Repository<Product>;

  let productService: ProductService;

  let db: Connection;

  beforeAll(async () => {
    db = await typeormHelper([Customer, Purchase, Product]);
  });

  beforeAll(async () => {
    productRepository = db.getRepository(Product);

    productService = new ProductService(productRepository);
  });

  afterEach(async () => {
    await productRepository.query(`DELETE FROM products;`);
  });

  afterAll(async () => {
    await db.close();
  });

  describe('products', () => {
    it('should list all product', async () => {
      await productService.create({
        id: '1',
        amount: 1980,
        type: 'ignite',
      });

      await productService.create({
        id: '2',
        amount: 1980,
        type: 'experts',
      });

      expect((await productRepository.find()).length).toEqual(2);
    });

    it('should list a one specific product', async () => {
      await productService.create({
        id: '1',
        amount: 1980,
        type: 'ignite',
      });

      await productService.create({
        id: '2',
        amount: 1980,
        type: 'experts',
      });

      const product = await productRepository.findOne({ id: '1' });

      expect(await productRepository.findOne({ id: '1' })).toMatchObject({
        id: '1',
        amount: 1980,
        type: 'ignite',
        created_at: product.created_at,
        updated_at: product.updated_at,
      });
    });
  });
});
