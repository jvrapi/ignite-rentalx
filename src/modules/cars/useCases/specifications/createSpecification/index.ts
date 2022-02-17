import { Request, Response } from 'express';
import { SpecificationsRepository } from '../../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const createSpecification = (request: Request, response: Response) => {
	const specificationsRepository = SpecificationsRepository.getInstance();

	const createSpecificationUseCase = new CreateSpecificationUseCase(
		specificationsRepository
	);

	const createSpecificationController = new CreateSpecificationController(
		createSpecificationUseCase
	);
	return createSpecificationController.handle(request, response);
};
export { createSpecification };
