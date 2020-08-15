import { uuid } from 'uuidv4';

import ICategoriesRepository from '@modules/item/repositories/ICategoriesRepository';

import Category from '@modules/item/infra/typeorm/entities/Category';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.name === name,
    );

    return findCategory;
  }

  public async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), name });

    this.categories.push(category);

    return category;
  }
}

export default FakeCategoriesRepository;
