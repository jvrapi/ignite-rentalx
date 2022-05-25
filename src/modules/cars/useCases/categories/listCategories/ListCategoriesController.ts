import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const categories = await listCategoriesUseCase.execute();

        if (categories.length === 0) {
            return response.status(204).send();
        }

        return response.json(categories);
    }
}
export { ListCategoriesController };
