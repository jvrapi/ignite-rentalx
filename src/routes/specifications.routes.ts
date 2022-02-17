import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { createSpecification } from '../modules/cars/useCases/specifications/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', createSpecification);

export { specificationsRoutes };
