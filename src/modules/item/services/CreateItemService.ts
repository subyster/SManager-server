import { getCustomRepository } from 'typeorm';

import Item from '../infra/typeorm/entities/Item';
import ItemsRepository from '../infra/typeorm/repositories/ItemsRepository';

interface IRequest {
  name: string;
  price: number;
  category: 'Roupas' | 'Livros' | 'Acessórios';
}

class CreateItemService {
  public async execute({ name, price, category }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemsRepository);

    const item = itemsRepository.create({ name, price, category });

    await itemsRepository.save(item);

    return item;
  }
}

export default CreateItemService;
