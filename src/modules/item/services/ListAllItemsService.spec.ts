import FakeItemsRepository from '../repositories/fakes/FakeItemsRepository';
import ListAllItemsService from './ListAllItemsService';

let fakeItemsRepository: FakeItemsRepository;
let listAllItems: ListAllItemsService;

describe('ListItems', () => {
  beforeEach(() => {
    fakeItemsRepository = new FakeItemsRepository();
    listAllItems = new ListAllItemsService(fakeItemsRepository);
  });
  it('should be able to list all items', async () => {
    const item1 = await fakeItemsRepository.create({
      user_id: 'user1',
      name: 'Camiseta confortável',
      category_name: 'cat1',
    });

    const item2 = await fakeItemsRepository.create({
      user_id: 'user1',
      name: 'Camiseta confortável',
      category_name: 'cat1',
    });

    const item3 = await fakeItemsRepository.create({
      user_id: 'user2',
      name: 'Camiseta confortável',
      category_name: 'cat1',
    });

    const allItems = await listAllItems.execute();

    expect(allItems).toEqual([item1, item2, item3]);
  });
});
