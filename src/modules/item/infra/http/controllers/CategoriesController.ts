import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/item/services/CreateCategoryService';
import ListCategoriesService from '@modules/item/services/ListCategoriesService';
import DeleteCategoryService from '@modules/item/services/DeleteCategoryService';

export default class CategoriessController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute(name);

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute(name);

    return response.status(204).send();
  }
}
