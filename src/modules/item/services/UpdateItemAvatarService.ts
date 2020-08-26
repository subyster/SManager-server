import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  item_id: string;
  avatar: string;
}

@injectable()
class UpdateItemAvatarService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ item_id, avatar }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new AppError('Item does not exist');
    }

    if (item.avatar) {
      await this.storageProvider.deleteFile(item.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatar);

    item.avatar = fileName;

    await this.itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemAvatarService;
