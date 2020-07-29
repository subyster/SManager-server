import Item from '../entities/Item';
import ICreateItemDTO from '../../../dtos/ICreateItemDTO';

class ItemsRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  public create({ name, price, category }: ICreateItemDTO): Item {
    const item = new Item(name, price, category);

    this.items.push(item);

    return item;
  }
}

export default ItemsRepository;
