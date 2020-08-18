import { Router } from 'express';

import itemsRouter from '@modules/item/infra/http/routes/items.routes';
import categoriesRouter from '@modules/item/infra/http/routes/categories.routes';

import usersRouter from '@modules/user/infra/http/routes/users.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/categories', categoriesRouter);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

export default routes;
