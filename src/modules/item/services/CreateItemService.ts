import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IItemsRepository from '../repositories/IItemsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  user_id: string;
  name: string;
  price?: number;
  category_name: string;
  size?: string;
  avatar?: string;
}

@injectable()
class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    name,
    price,
    category_name,
    size,
    avatar,
  }: IRequest): Promise<Item> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      category_name,
    );

    if (!checkCategoryExists) {
      throw new AppError('Category Does not exist');
    }

    const item = await this.itemsRepository.create({
      user_id,
      name,
      price,
      category_name,
      size,
    });

    if (avatar) {
      const fileName = await this.storageProvider.saveFile(avatar);

      item.avatar = fileName;

      await this.itemsRepository.save(item);
    }

    return item;
  }
}

export default CreateItemService;
