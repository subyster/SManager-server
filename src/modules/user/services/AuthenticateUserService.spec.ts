import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Joe',
      surname: 'Doe',
      cpf: 12345678900,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'joedoe@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'joedoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'joedoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Joe',
      surname: 'Doe',
      cpf: 12345678900,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'joedoe@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'joedoe@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
