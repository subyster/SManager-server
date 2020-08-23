import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.post('/', categoriesController.create);

categoriesRouter.delete('/:name', categoriesController.delete);

export default categoriesRouter;
