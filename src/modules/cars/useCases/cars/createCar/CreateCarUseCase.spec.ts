import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create car', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand',
      category_id: 'Category',
      fine_amount: 60
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with the same license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car 1',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        brand: 'Brand',
        category_id: 'Category',
        fine_amount: 60
      });

      await createCarUseCase.execute({
        name: 'Name car 2',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        brand: 'Brand',
        category_id: 'Category',
        fine_amount: 60
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand',
      category_id: 'Category',
      fine_amount: 60
    });

    expect(car.available).toBe(true);
  });
});
