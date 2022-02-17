import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
	constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

	handle(request: Request, response: Response): Response {
		const categories = this.listCategoriesUseCase.execute();

		if (categories.length === 0) {
			return response.status(204).send();
		}

		return response.json(categories);
	}
}
export { ListCategoriesController };
