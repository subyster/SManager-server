import { injectable, inject } from 'tsyringe';

import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  user_id: string;
  name: string;
  price?: number;
  category_id: string;
  size?: string;
}

@injectable()
class CreateItemService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  public async execute({
    user_id,
    name,
    price,
    category_id,
    size,
  }: IRequest): Promise<Item> {
    const item = await this.itemsRepository.create({
      user_id,
      name,
      price,
      category_id,
      size,
    });

    return item;
  }
}

export default CreateItemService;
