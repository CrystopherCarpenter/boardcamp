import { Router } from 'express';
import {
    createCategory,
    getCategories,
} from '../controllers/categoriesController.js';
import validateSchemaMiddleware from '../middleware/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categoriesRouter = Router();

categoriesRouter.post(
    '/categories',
    validateSchemaMiddleware(categorySchema),
    createCategory
);

categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;
