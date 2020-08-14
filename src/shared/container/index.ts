import { container } from 'tsyringe';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ItemsRepository from '@modules/item/infra/typeorm/repositories/ItemsRepository';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
