import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/item/services/CreateItemService';

export default class ItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, price, category_id, size } = request.body;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      user_id,
      name,
      price,
      category_id,
      size,
    });

    return response.json(item);
  }
}
