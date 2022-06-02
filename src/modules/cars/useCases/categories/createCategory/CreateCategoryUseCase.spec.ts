import { AppError } from '../../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    await expect(
      createCategoryUseCase.execute({
        description: 'Category description test',
        name: 'Category test'
      })
    ).resolves.not.toThrow();
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        description: 'Category description test',
        name: 'Category test'
      });

      await createCategoryUseCase.execute({
        description: 'Category description test',
        name: 'Category test'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
