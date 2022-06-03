import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUSerDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}

export { UsersRepository };
