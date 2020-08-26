import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  user_id: string;
  category?: string;
  status?: 'pendent' | 'available' | 'sold';
}

@injectable()
class FilterUserItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    user_id,
    category,
    status,
  }: IRequest): Promise<Item[]> {
    if (!category && !status) {
      throw new AppError('No filters were sent');
    }

    let items = await this.itemsRepository.findAllItems({
      user_id,
    });

    if (category) {
      items = items.filter(item => item.category_name === category);
    }

    if (status) {
      items = items.filter(item => item.status === status);
    }

    return items;
  }
}

export default FilterUserItemsService;
