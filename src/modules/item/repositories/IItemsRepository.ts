import Item from '../infra/typeorm/entities/Item';
import ICreateItemDTO from '../dtos/ICreateItemDTO';
import IFindAllItemsDTO from '../dtos/IFindAllItemsDTO';

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
  findAllItems(data: IFindAllItemsDTO): Promise<Item[]>;
  save(item: Item): Promise<Item>;
}
