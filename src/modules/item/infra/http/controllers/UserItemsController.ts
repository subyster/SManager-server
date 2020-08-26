import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserItemsService from '@modules/item/services/ListUserItemsService';
import FilterUserItemsService from '@modules/item/services/FilterUserItemsService';

export default class UserItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listItems = container.resolve(ListUserItemsService);

    const items = await listItems.execute({ user_id });

    return response.json(classToClass(items));
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const filters = request.query;

    const category = filters.category as string;
    const status = filters.status as 'pendent' | 'available' | 'sold';

    const filterItems = container.resolve(FilterUserItemsService);

    const items = await filterItems.execute({ user_id, category, status });

    return response.json(classToClass(items));
  }
}
