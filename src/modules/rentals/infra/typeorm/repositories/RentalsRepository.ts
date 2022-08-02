import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car_id, end_date: null }
    });
  }

  findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null }
    });
  }

  create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);
    return this.repository.save(rental);
  }

  findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
}
export { RentalsRepository };
