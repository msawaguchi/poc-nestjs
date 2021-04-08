import { Connection, Repository } from 'typeorm';

import { typeormHelper } from '../../test/utils/typeormHelper';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Purchase } from '../models/purchase.model';
import { Product } from '../models/product.model';
import { PurchaseService } from './purchase.service';
import { ProductService } from './product.service';

describe('PurchaseResolver', () => {
  let customerRepository: Repository<Customer>;
  let productRepository: Repository<Product>;
  let repository: Repository<Purchase>;
  let service: PurchaseService;
  let customerService: CustomerService;
  let productService: ProductService;
  let db: Connection;

  beforeAll(async () => {
    db = await typeormHelper([Customer, Purchase, Product]);

    repository = db.getRepository(Purchase);
    customerRepository = db.getRepository(Customer);
    productRepository = db.getRepository(Product);
    customerService = new CustomerService(customerRepository);
    productService = new ProductService(productRepository);
    service = new PurchaseService(repository, customerService);
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM purchases;`);
  });

  afterAll(async () => {
    await db.close();
  });

  describe('purchases', () => {
    it('should list all purchases', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const customer2 = await customerService.create({
        id: '2',
        name: 'John Doe2',
        email: 'johndoe2@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: '',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const experts = await productService.create({
        id: 'experts',
        amount: 70,
        type: 'reccuring',
      });

      const purchases = await repository.save([
        {
          id: '1',
          customer_id: customer.id,
          product_id: ignite.id,
          status: 'success',
        },
        {
          id: '2',
          customer_id: customer.id,
          product_id: experts.id,
          status: 'success',
        },
        {
          id: '3',
          customer_id: customer2.id,
          product_id: ignite.id,
          status: 'success',
        },
      ]);

      expect(await service.findAll()).toEqual(purchases);
    });

    it('should create a new purchase', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const purchase = await service.create({
        id: '1',
        customer_id: customer.id,
        product_id: ignite.id,
      });

      expect(await repository.findOne('1')).toEqual(purchase);
    });

    it('should get purchase by id', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const experts = await productService.create({
        id: 'experts',
        amount: 70,
        type: 'reccuring',
      });

      const purchases = await repository.save([
        {
          id: '1',
          customer_id: customer.id,
          product_id: ignite.id,
          status: 'success',
        },
        {
          id: '2',
          customer_id: customer.id,
          product_id: experts.id,
          status: 'success',
        },
      ]);

      expect(await service.findOne('1')).toEqual(purchases[0]);
    });

    it('should get purchase by customer', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const customer2 = await customerService.create({
        id: '2',
        name: 'John Doe2',
        email: 'johndoe2@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: '',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const experts = await productService.create({
        id: 'experts',
        amount: 70,
        type: 'reccuring',
      });

      const purchases = await repository.save([
        {
          id: '1',
          customer_id: customer.id,
          product_id: ignite.id,
          status: 'success',
        },
        {
          id: '2',
          customer_id: customer.id,
          product_id: experts.id,
          status: 'success',
        },
        {
          id: '3',
          customer_id: customer2.id,
          product_id: ignite.id,
          status: 'success',
        },
      ]);

      expect(await service.findByCustomer(customer2.id)).toEqual([
        purchases[2],
      ]);
    });

    it('should get purchase by product', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const experts = await productService.create({
        id: 'experts',
        amount: 70,
        type: 'reccuring',
      });

      const purchases = await repository.save([
        {
          id: '1',
          customer_id: customer.id,
          product_id: ignite.id,
          status: 'success',
        },
        {
          id: '2',
          customer_id: customer.id,
          product_id: experts.id,
          status: 'success',
        },
      ]);

      expect(await service.findByProduct('ignite')).toEqual([purchases[0]]);
    });

    it('should be able to refund a purchase', async () => {
      const customer = await customerService.create({
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        state: 'state',
        city: 'city',
        street: 'street',
        experts_club: 'access',
        ignite: 'access',
      });

      const ignite = await productService.create({
        id: 'ignite',
        amount: 1980,
        type: 'onetime',
      });

      const purchases = await repository.save([
        {
          id: '1',
          customer_id: customer.id,
          product_id: ignite.id,
          status: 'success',
        },
      ]);

      const refundedPurchase = await service.refund({
        id: purchases[0].id,
        customer_id: customer.id,
      });

      expect(await service.findOne('1')).toEqual(refundedPurchase);
    });
  });
});
