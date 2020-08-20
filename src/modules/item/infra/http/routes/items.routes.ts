import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ItemsController from '../controllers/ItemsController';
import UserItemsController from '../controllers/UserItemsController';

const itemsRouter = Router();
const itemsController = new ItemsController();
const userItemsController = new UserItemsController();
const upload = multer(uploadConfig);

itemsRouter.use(ensureAuthenticated);

itemsRouter.get('/', itemsController.index);
itemsRouter.get('/:user_id', userItemsController.index);

itemsRouter.post('/', upload.single('avatar'), itemsController.create);

export default itemsRouter;
