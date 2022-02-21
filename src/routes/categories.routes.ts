import { Router } from 'express';
import multer from 'multer';
import { createCategory } from '../modules/cars/useCases/categories/createCategory';
import { importCategory } from '../modules/cars/useCases/categories/importCategory';
import { listCategories } from '../modules/cars/useCases/categories/listCategories';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

categoriesRoutes.post('/', createCategory);

categoriesRoutes.get('/', listCategories);

categoriesRoutes.post('/import', upload.single('file'), importCategory);

export { categoriesRoutes };
