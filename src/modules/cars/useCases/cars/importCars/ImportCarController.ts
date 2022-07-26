import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCarUseCase } from './ImportCarUseCase';

class ImportCarController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const { file } = request;
    const importCarUseCase = container.resolve(ImportCarUseCase);
    await importCarUseCase.execute(file);
    return response.status(201).send();
  }
}
export { ImportCarController };
