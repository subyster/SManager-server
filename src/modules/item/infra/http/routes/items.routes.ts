import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ItemsController from '../controllers/ItemsController';
import UserItemsController from '../controllers/UserItemsController';
import ItemAvatarController from '../controllers/ItemAvatarController';

const itemsRouter = Router();
const itemsController = new ItemsController();
const userItemsController = new UserItemsController();
const itemAvatarController = new ItemAvatarController();
const upload = multer(uploadConfig);

itemsRouter.use(ensureAuthenticated);

itemsRouter.get('/', itemsController.index);
itemsRouter.get('/:user_id', userItemsController.index);
itemsRouter.get('/show/:item_id', itemsController.show);
itemsRouter.get('/search_items/:user_id', userItemsController.search);

itemsRouter.post('/', upload.single('avatar'), itemsController.create);

itemsRouter.put('/:item_id', itemsController.update);
itemsRouter.patch(
  '/:item_id',
  upload.single('avatar'),
  itemAvatarController.update,
);

itemsRouter.delete('/:item_id', itemsController.delete);

export default itemsRouter;
