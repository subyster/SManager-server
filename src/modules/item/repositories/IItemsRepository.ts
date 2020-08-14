import Item from '../infra/typeorm/entities/Item';
import ICreateItemDTO from '../dtos/ICreateItemDTO';

export default interface IItemsRepository {
  create(data: ICreateItemDTO): Promise<Item>;
}
