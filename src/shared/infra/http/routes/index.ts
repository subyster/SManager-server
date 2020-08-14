import { Router } from 'express';

import itemsRouter from '@modules/item/infra/http/routes/items.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
