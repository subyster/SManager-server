import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ItemsController from '../controllers/ItemsController';

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.use(ensureAuthenticated);

// itemsRouter.get('/', async (request, response) => {
//   const items = await itemsRepository.find();

//   return response.json(items);
// });

itemsRouter.post('/', itemsController.create);

export default itemsRouter;
