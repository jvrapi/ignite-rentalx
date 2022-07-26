import { CreateCarController } from '@modules/cars/useCases/cars/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/cars/createCarSpecifications/CreateCarSpecificationController';
import { ImportCarController } from '@modules/cars/useCases/cars/importCars/ImportCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/cars/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const importCarController = new ImportCarController();

const upload = multer({
  dest: './tmp'
});

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);
carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);
carsRoutes.post('/', createCarController.handle);

carsRoutes.post('/import', upload.single('file'), importCarController.handle);

export { carsRoutes };
