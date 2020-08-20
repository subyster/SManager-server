import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import ListUserItemsService from './ListUserItemsService';

let fakeItemsRepository: FakeItemsRepository;
let listUserItems: ListUserItemsService;

describe('ListItems', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository();
    listUserItems = new ListUserItemsService(fakeItemsRepository);
  });
  it('should be able to list all items from one user', async () => {
    const item1 = await fakeItemsRepository.create({
      user_id: 'user1',
      name: 'Camiseta confortável',
      category_name: 'cat1',
    });

    const item2 = await fakeItemsRepository.create({
      user_id: 'user1',
      name: 'Calça',
      category_name: 'cat1',
    });

    await fakeItemsRepository.create({
      user_id: 'user2',
      name: 'Tênis',
      category_name: 'cat2',
    });

    const allItems = await listUserItems.execute({ user_id: 'user1' });

    expect(allItems).toEqual([item1, item2]);
  });
});
