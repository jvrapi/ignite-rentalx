import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
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
    await createCategoryUseCase.execute({
      description: 'Category description test',
      name: 'Category test'
    });

    await expect(
      createCategoryUseCase.execute({
        description: 'Category description test',
        name: 'Category test'
      })
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
