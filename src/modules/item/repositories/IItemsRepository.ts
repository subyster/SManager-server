import Item from '../infra/typeorm/entities/Item';
import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IFindAllItemsDTO from '../dtos/IFindAllItemsDTO';

export default interface IItemsRepository {
  findById(id: string): Promise<Item | undefined>;
  findAllItems(data: IFindAllItemsDTO): Promise<Item[]>;
  create(data: ICreateItemDTO): Promise<Item>;
  save(item: Item): Promise<Item>;
}
