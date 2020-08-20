import { injectable, inject } from 'tsyringe';

import IItemsRepository from '../repositories/IItemsRepository';
import Item from '../infra/typeorm/entities/Item';

@injectable()
class ListAllItemsService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute(): Promise<Item[]> {
    const items = await this.itemsRepository.findAllItems({});

    return items;
  }
}

export default ListAllItemsService;
