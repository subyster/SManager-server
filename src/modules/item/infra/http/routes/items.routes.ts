import { Router } from 'express';

import ItemsRepository from '../../typeorm/repositories/ItemsRepository';
import CreateItemService from '../../../services/CreateItemService';

const itemsRouter = Router();
const itemsRepository = new ItemsRepository();

itemsRouter.get('/', (request, response) => {
  const items = itemsRepository.listItems();

  return response.json(items);
});

itemsRouter.post('/', (request, response) => {
  const { name, price, category } = request.body;

  const createItem = new CreateItemService(itemsRepository);

  const item = createItem.execute({ name, price, category });

  return response.json(item);
});

export default itemsRouter;
