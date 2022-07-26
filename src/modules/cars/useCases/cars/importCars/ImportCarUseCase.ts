import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IImportCar {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  brand: string;
  category: string;
  fine_amount: number;
}

@injectable()
class ImportCarUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  loadCars(file: Express.Multer.File): Promise<IImportCar[]> {
    return new Promise((resolve, reject) => {
      // cria uma stream de leitura do arquivo upado
      const stream = fs.createReadStream(file.path);

      const cars: IImportCar[] = [];

      const parseFile = parse();

      // a cada chunck lido, o pipe envia a informação para um lugar
      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category,
            fine_amount
          ] = line;
          cars.push({
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category,
            fine_amount
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(cars);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const cars = await this.loadCars(file);

    cars.map(
      async ({
        brand,
        category,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
      }) => {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
          license_plate
        );

        if (!carAlreadyExists) {
          const { id: category_id } =
            await this.categoriesRepository.findByName(category.trim());

          await this.carsRepository.create({
            name: name.trim(),
            description: description.trim(),
            license_plate: license_plate.trim(),
            brand: brand.trim(),
            daily_rate,
            category_id,
            fine_amount
          });
        }
      }
    );
  }
}
export { ImportCarUseCase };
