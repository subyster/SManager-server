import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ItemsRepository from '../../typeorm/repositories/ItemsRepository';
import CreateItemService from '../../../services/CreateItemService';

import ensureAuthenticated from '../../../../user/infra/http/middlewares/ensureAuthenticated';

const itemsRouter = Router();

itemsRouter.use(ensureAuthenticated);

itemsRouter.get('/', async (request, response) => {
  const itemsRepository = getCustomRepository(ItemsRepository);
  const items = await itemsRepository.find();

  return response.json(items);
});

itemsRouter.post('/', async (request, response) => {
  const { name, price, category } = request.body;

  const createItem = new CreateItemService();

  const item = await createItem.execute({ name, price, category });

  return response.json(item);
});

export default itemsRouter;
