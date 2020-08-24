import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IItemsRepository from '../repositories/IItemsRepository';

@injectable()
class DeleteItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(item_id: string): Promise<void> {
    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new AppError('Item does not exist');
    }

    await this.storageProvider.deleteFile(item.avatar);

    await this.itemsRepository.delete(item.id);
  }
}

export default DeleteItemService;
