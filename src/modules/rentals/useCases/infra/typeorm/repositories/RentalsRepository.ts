import { ICreateRentalDTO } from '@modules/rentals/useCases/createRental/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/useCases/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      car_id
    });
  }

  findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      user_id
    });
  }

  create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);
    return this.repository.save(rental);
  }
}
export { RentalsRepository };
