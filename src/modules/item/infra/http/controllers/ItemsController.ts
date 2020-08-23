import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateItemService from '@modules/item/services/CreateItemService';
import ListAllItemsService from '@modules/item/services/ListAllItemsService';
import { classToClass } from 'class-transformer';
import UpdateItemService from '@modules/item/services/UpdateItemService';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(ListAllItemsService);

    const items = await listItems.execute();

    return response.json(classToClass(items));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, price, category_name, size } = request.body;

    const avatar = request.file.filename;

    const createItem = container.resolve(CreateItemService);

    const item = await createItem.execute({
      user_id,
      name,
      price,
      category_name,
      size,
      avatar,
    });

    return response.json(classToClass(item));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { item_id } = request.params;

    const avatar = request.file.filename;

    const { user_id, name, price, category_name, size, status } = request.body;

    const updateItem = container.resolve(UpdateItemService);

    const item = await updateItem.execute({
      item_id,
      user_id,
      name,
      price,
      category_name,
      size,
      status,
      avatar,
    });

    return response.json(classToClass(item));
  }
}
