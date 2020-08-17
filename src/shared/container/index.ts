import { container } from 'tsyringe';

import '@modules/user/providers';
import './providers';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ItemsRepository from '@modules/item/infra/typeorm/repositories/ItemsRepository';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

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

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
