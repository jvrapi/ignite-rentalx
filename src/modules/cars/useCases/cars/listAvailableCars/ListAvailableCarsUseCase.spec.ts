import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('List all cars', () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      brand: 'Car brand',
      category_id: 'category_id',
      fine_amount: 40
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toContainEqual(car);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CarTest',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      brand: 'Car brand',
      category_id: 'category_id',
      fine_amount: 40
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'CarTest'
    });

    expect(cars).toContainEqual(car);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      brand: 'Car_brand_test',
      category_id: 'category_id',
      fine_amount: 40
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand_test'
    });

    expect(cars).toContainEqual(car);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by car brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      brand: 'Car_brand_test',
      category_id: 'category_id_test',
      fine_amount: 40
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id_test'
    });

    expect(cars).toContainEqual(car);
    expect(cars).toEqual([car]);
  });
});
