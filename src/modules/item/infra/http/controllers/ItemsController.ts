import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAllItemsService from '@modules/item/services/ListAllItemsService';
import ShowItemService from '@modules/item/services/ShowItemService';
import CreateItemService from '@modules/item/services/CreateItemService';
import UpdateItemService from '@modules/item/services/UpdateItemService';
import DeleteItemService from '@modules/item/services/DeleteItemService';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItems = container.resolve(ListAllItemsService);

    const items = await listItems.execute();

    return response.json(classToClass(items));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { item_id } = request.params;

    const showItem = container.resolve(ShowItemService);

    const item = await showItem.execute({ item_id });

    return response.json(classToClass(item));
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

    const {
      instagram_url,
      name,
      price,
      category_name,
      size,
      status,
    } = request.body;

    const updateItem = container.resolve(UpdateItemService);

    const item = await updateItem.execute({
      item_id,
      name,
      instagram_url,
      category_name,
      status,
      size,
      price,
    });

    return response.json(classToClass(item));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { item_id } = request.params;

    const deleteItem = container.resolve(DeleteItemService);

    await deleteItem.execute(item_id);

    return response.status(204).send();
  }
}
