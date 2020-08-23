import { getRepository, Repository } from 'typeorm';

import IItemsRepository from '@modules/item/repositories/IItemsRepository';
import ICreateItemDTO from '@modules/item/dtos/ICreateItemDTO';
import IFindAllItemsDTO from '@modules/item/dtos/IFindAllItemsDTO';

import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async findById(id: string): Promise<Item | undefined> {
    const item = await this.ormRepository.findOne(id);

    return item;
  }

  public async findAllItems({ user_id }: IFindAllItemsDTO): Promise<Item[]> {
    let items: Item[];

    if (user_id) {
      items = await this.ormRepository.find({
        where: { user_id },
      });
    } else {
      items = await this.ormRepository.find({ relations: ['user'] });
    }

    return items;
  }

  public async create({
    user_id,
    name,
    category_name,
    price,
    size,
  }: ICreateItemDTO): Promise<Item> {
    const item = this.ormRepository.create({
      user_id,
      name,
      category_name,
      price,
      size,
    });

    item.status = 'pendent';

    await this.ormRepository.save(item);

    return item;
  }

  public async save(item: Item): Promise<Item> {
    return this.ormRepository.save(item);
  }
}

export default ItemsRepository;
