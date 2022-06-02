import { AppError } from '@errors/AppError';
import { Category } from '@modules/cars/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable() // diz que essa classe poderá ser injetada em outros locais
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository') // injeta o repositorio que foi configurado no arquivo do index da pasta container
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    const category = this.categoriesRepository.create({
      description,
      name
    });
    return category;
  }
}

export { CreateCategoryUseCase };
