import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  item_id: string;
}

@injectable()
class ShowItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ item_id }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.findById(item_id);

    if (!item) {
      throw new AppError('Item does not exist.');
    }

    return item;
  }
}

export default ShowItemService;
