import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from '../services/auth.service';
import { AuthInput } from '../inputs/auth.input';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          // using a factory just because
          useFactory: () => ({
            validateUser: jest.fn((data: AuthInput) => ({
              customer: {
                id: '1',
                email: data.email,
                name: 'John Doe',
                ignite: 'access',
              },
              token: 'tokentest',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('auth', () => {
    it('should authenticate user', async () => {
      expect(await resolver.login({ email: 'johndoe@email.com' })).toEqual({
        customer: {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
          ignite: 'access',
        },
        token: 'tokentest',
      });
    });
  });
});
