import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IItemsRepository from '../repositories/IItemsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  item_id: string;
  instagram_url: string;
  name: string;
  price?: number;
  category_name: string;
  size?: string;
  status: 'sold' | 'available' | 'pendent';
  avatar?: string;
}

@injectable()
class UpdateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    item_id,
    instagram_url,
    name,
    price,
    category_name,
    size,
    status,
    avatar,
  }: IRequest): Promise<Item> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      category_name,
    );

    if (!checkCategoryExists) {
      throw new AppError('Category Does not exist');
    }

    if (status !== 'available' && status !== 'sold' && status !== 'pendent') {
      throw new AppError('Wrong status name');
    }

    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new AppError('Item not found');
    }

    Object.assign(item, {
      instagram_url,
      name,
      price,
      category_name,
      size,
      status,
    });

    if (avatar) {
      if (item.avatar) {
        await this.storageProvider.deleteFile(item.avatar);
      }

      const fileName = await this.storageProvider.saveFile(avatar);

      item.avatar = fileName;
    }

    await this.itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemService;
