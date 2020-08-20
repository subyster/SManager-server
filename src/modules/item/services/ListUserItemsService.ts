import { injectable, inject } from 'tsyringe';

import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

interface IRequest {
  user_id?: string;
}

@injectable()
class ListItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Item[]> {
    const items = await this.itemsRepository.findAllItems({
      user_id,
    });

    return items;
  }
}

export default ListItemsService;
