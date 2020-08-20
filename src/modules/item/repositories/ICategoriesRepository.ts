import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findAllCategories(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  create(name: string): Promise<Category>;
}
