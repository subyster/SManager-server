import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import CreateItemService from './CreateItemService';

describe('CreateItem', () => {
  it('should be able to create an item', async () => {
    const fakeItemsRepository = new FakeItemsRepository();
    const createItem = new CreateItemService(fakeItemsRepository);

    const item = await createItem.execute({
      user_id: '123456789',
      name: 'Camiseta confortável',
      category_id: '123123123',
    });

    expect(item).toHaveProperty('id');
    expect(item.user_id).toBe('123456789');
  });
});
