import { Category } from '../../../models/Category';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Category {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }

        const category = this.categoriesRepository.create({
            description,
            name
        });
        return category;
    }
}

export { CreateCategoryUseCase };
