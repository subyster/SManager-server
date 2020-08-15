import { uuid } from 'uuidv4';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/item/dtos/ICreateItemDTO';

import Item from '@modules/item/infra/typeorm/entities/Item';

class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  public async create({
    user_id,
    name,
    category_id,
    price,
    size,
  }: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, {
      id: uuid(),
      user_id,
      name,
      category_id,
      price,
      size,
    });

    this.items.push(item);

    return item;
  }
}

export default FakeItemsRepository;
