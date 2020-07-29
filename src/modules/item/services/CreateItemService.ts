import Item from '../infra/typeorm/entities/Item';
import ItemsRepository from '../infra/typeorm/repositories/ItemsRepository';

interface IRequest {
  name: string;
  price: number;
  category: 'Roupas' | 'Livros' | 'Acessórios';
}

class CreateItemService {
  private itemsRepository: ItemsRepository;

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository;
  }

  public execute({ name, price, category }: IRequest): Item {
    const item = this.itemsRepository.create({ name, price, category });

    return item;
  }
}

export default CreateItemService;
