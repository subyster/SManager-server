import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserItemsService from '@modules/item/services/ListUserItemsService';
import { classToClass } from 'class-transformer';

export default class UserItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listItems = container.resolve(ListUserItemsService);

    const items = await listItems.execute({ user_id });

    return response.json(classToClass(items));
  }
}
