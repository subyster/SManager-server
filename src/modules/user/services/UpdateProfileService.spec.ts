import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
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

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John',
      surname: 'Doe',
      cpf: 12345678900,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'RJ',
      city: 'Brasilia',
    });

    expect(updatedUser.name).toBe('John');
    expect(updatedUser.uf).toBe('RJ');
  });

  it('should not be able to update non-existing user profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'John',
        surname: 'Doe',
        cpf: 12345678900,
        phone: 42955325823,
        gender: 'M',
        address: 'Rua 1, n 500',
        neighborhood: 'Centro',
        uf: 'RJ',
        city: 'Brasilia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user email', async () => {
    await fakeUsersRepository.create({
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

    const user = await fakeUsersRepository.create({
      name: 'John',
      surname: 'Doe',
      cpf: 12345678901,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joe',
        surname: 'Doe',
        cpf: 12345678900,
        phone: 42955325823,
        gender: 'M',
        address: 'Rua 1, n 500',
        neighborhood: 'Centro',
        uf: 'DF',
        city: 'Brasilia',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
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

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John',
      surname: 'Doe',
      cpf: 12345678900,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'RJ',
      city: 'Brasilia',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without informing old password', async () => {
    const user = await fakeUsersRepository.create({
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
      updateProfile.execute({
        user_id: user.id,
        name: 'John',
        surname: 'Doe',
        cpf: 12345678900,
        phone: 42955325823,
        gender: 'M',
        address: 'Rua 1, n 500',
        neighborhood: 'Centro',
        uf: 'RJ',
        city: 'Brasilia',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password informing wrong old password', async () => {
    const user = await fakeUsersRepository.create({
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
      updateProfile.execute({
        user_id: user.id,
        name: 'John',
        surname: 'Doe',
        cpf: 12345678900,
        phone: 42955325823,
        gender: 'M',
        address: 'Rua 1, n 500',
        neighborhood: 'Centro',
        uf: 'RJ',
        city: 'Brasilia',
        old_password: 'wrong_old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
