import { Request, Response } from 'express';
import { CategoriesRepository } from '../../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const importCategory = (request: Request, response: Response) => {
    const repository = CategoriesRepository.getInstance();
    const importCategoryUseCase = new ImportCategoryUseCase(repository);
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase
    );
    return importCategoryController.handle(request, response);
};
export { importCategory };
