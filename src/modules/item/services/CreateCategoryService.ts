import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

import Category from '../infra/typeorm/entities/Category';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(name: string): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkCategoryExists) {
      throw new AppError('This category already exists');
    }

    const category = await this.categoriesRepository.create(name);

    return category;
  }
}

export default CreateCategoryService;
