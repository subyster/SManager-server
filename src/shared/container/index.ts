import { container } from 'tsyringe';

import '@modules/user/providers';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ItemsRepository from '@modules/item/infra/typeorm/repositories/ItemsRepository';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

import ICategoriesRepository from '@modules/item/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/item/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
