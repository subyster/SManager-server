import AppError from '@shared/errors/AppError';
import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateItemService from './CreateItemService';

let fakeItemsRepository: FakeItemsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createItem: CreateItemService;

describe('CreateItem', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createItem = new CreateItemService(
      fakeItemsRepository,
      fakeCategoriesRepository,
    );
  });
  it('should be able to create an item', async () => {
    const category = await fakeCategoriesRepository.create('Roupas');

    const item = await createItem.execute({
      user_id: '123456789',
      name: 'Camiseta confortável',
      category_name: category.name,
    });

    expect(item).toHaveProperty('id');
    expect(item.status).toBe('pendent');
  });

  it('should not be able to create an item with non existant category', async () => {
    expect(
      createItem.execute({
        user_id: '123456789',
        name: 'Camiseta confortável',
        category_name: 'Roupas',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
