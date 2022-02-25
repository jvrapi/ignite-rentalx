import { Request, Response } from 'express';
import { CategoriesRepository } from '../../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const listCategories = (request: Request, response: Response) => {
    const categoriesRepository = new CategoriesRepository();

    const listCategoriesUseCase = new ListCategoriesUseCase(
        categoriesRepository
    );
    const listCategoriesController = new ListCategoriesController(
        listCategoriesUseCase
    );
    return listCategoriesController.handle(request, response);
};
export { listCategories };
