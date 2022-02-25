import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { importCategory } from '../modules/cars/useCases/categories/importCategory';
import { listCategories } from '../modules/cars/useCases/categories/listCategories';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategories);

categoriesRoutes.post('/import', upload.single('file'), importCategory);

export { categoriesRoutes };
