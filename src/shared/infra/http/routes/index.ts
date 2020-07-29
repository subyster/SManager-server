import { Router } from 'express';

import itemsRouter from '../../../../modules/item/infra/http/routes/items.routes';

const routes = Router();

routes.use('/items', itemsRouter);

export default routes;
