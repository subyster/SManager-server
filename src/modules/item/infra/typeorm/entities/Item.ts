import { uuid } from 'uuidv4';

class Item {
  id: string;

  name: string;

  price: number;

  category: string;

  constructor(name: string, price: number, category: string) {
    this.id = uuid();
    this.name = name;
    this.price = price;
    this.category = category;
  }
}

export default Item;
