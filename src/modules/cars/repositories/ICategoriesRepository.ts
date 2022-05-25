import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ description, name }: ICreateCategoryDTO): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
