import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
    constructor(
        private createSpecificationUseCase: CreateSpecificationUseCase
    ) {}

    handle(request: Request, response: Response): Response {
        const { description, name } = request.body;
        const specification = this.createSpecificationUseCase.execute({
            description,
            name
        });
        return response.status(201).json(specification);
    }
}
export { CreateSpecificationController };
