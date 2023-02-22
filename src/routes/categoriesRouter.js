import { Router } from 'express';
import * as categoriesController from '../controllers/categoriesController.js';
import { validateSchemaMiddleware } from '../middleware/validateSchemaMiddleware.js';
import categorySchema from '../schemas/categorySchema.js';

const categories = Router();

categories
    .post(
        '/',
        validateSchemaMiddleware(categorySchema),
        categoriesController.create
    )
    .get('/', categoriesController.getAll);

export { categories };
