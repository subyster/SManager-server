import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });
  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
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

    const user2 = await fakeUsersRepository.create({
      name: 'John',
      surname: 'Tre',
      cpf: 12345678901,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'johntre@gmail.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Jack',
      surname: '4',
      cpf: 12345678902,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'jack4@gmail.com',
      password: '123456',
    });

    const providers = await listUsers.execute({});

    expect(providers).toEqual([user1, user2, user3]);
  });

  it('should be able to list all users except logged user', async () => {
    const user1 = await fakeUsersRepository.create({
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

    const user2 = await fakeUsersRepository.create({
      name: 'John',
      surname: 'Tre',
      cpf: 12345678901,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'johntre@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jack',
      surname: '4',
      cpf: 12345678902,
      phone: 42955325823,
      gender: 'M',
      address: 'Rua 1, n 500',
      neighborhood: 'Centro',
      uf: 'DF',
      city: 'Brasilia',
      email: 'jack4@gmail.com',
      password: '123456',
    });

    const providers = await listUsers.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
