import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(name: string): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    await this.categoriesRepository.delete(name);
  }
}

export default DeleteCategoryService;
