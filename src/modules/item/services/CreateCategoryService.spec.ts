import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

describe('CreateCategory', () => {
  it('should be able to create a category', async () => {
    const fakeCategoriesRepository = new FakeCategoriesRepository();
    const createCategory = new CreateCategoryService(fakeCategoriesRepository);

    const category = await createCategory.execute('Roupas');

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create an existing category', async () => {
    const fakeCategoriesRepository = new FakeCategoriesRepository();
    const createCategory = new CreateCategoryService(fakeCategoriesRepository);

    await createCategory.execute('Roupas');

    await expect(createCategory.execute('Roupas')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
