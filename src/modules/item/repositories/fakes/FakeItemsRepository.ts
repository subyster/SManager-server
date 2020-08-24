import { uuid } from 'uuidv4';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/item/dtos/ICreateItemDTO';

import Item from '@modules/item/infra/typeorm/entities/Item';
import IFindAllItemsDTO from '@modules/item/dtos/IFindAllItemsDTO';

class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  public async findById(id: string): Promise<Item | undefined> {
    const findItem = this.items.find(item => item.id === id);

    return findItem;
  }

  public async findAllItems({ user_id }: IFindAllItemsDTO): Promise<Item[]> {
    let { items } = this;

    if (user_id) {
      items = this.items.filter(item => item.user_id === user_id);
    }

    return items;
  }

  public async create({
    user_id,
    name,
    category_name,
    price,
    size,
    avatar,
  }: ICreateItemDTO): Promise<Item> {
    const item = new Item();

    Object.assign(item, {
      id: uuid(),
      user_id,
      name,
      category_name,
      price,
      size,
      avatar,
    });

    item.status = 'pendent';

    this.items.push(item);

    return item;
  }

  public async save(item: Item): Promise<Item> {
    const findIndex = this.items.findIndex(findItem => findItem.id === item.id);

    this.items[findIndex] = item;

    return item;
  }

  public async delete(item_id: string): Promise<void> {
    const item = await this.findById(item_id);

    if (item) {
      const itemIndex = this.items.findIndex(
        findItem => findItem.id === item.id,
      );

      this.items.splice(itemIndex, 0);
    }
  }
}

export default FakeItemsRepository;
