import { getRepository, Repository } from 'typeorm';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/item/dtos/ICreateItemDTO';

import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async create({
    user_id,
    name,
    category_id,
    price,
    size,
  }: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create({
      user_id,
      name,
      category_id,
      price,
      size,
    });

    await this.ormRepository.save(item);

    return item;
  }
}

export default ItemsRepository;
