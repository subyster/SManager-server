import { Router } from 'express';

import ItemsRepository from '../../typeorm/repositories/ItemsRepository';

const itemsRouter = Router();
const itemsRepository = new ItemsRepository();

itemsRouter.post('/', (request, response) => {
  const { name, price, category } = request.body;

  const item = itemsRepository.create({ name, price, category });

  return response.json(item);
});

export default itemsRouter;
