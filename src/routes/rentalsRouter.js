import { Router } from 'express';
import * as rentalsController from '../controllers/rentalsController.js';
import { validateSchemaMiddleware } from '../middleware/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentals = Router();

rentals
    .post('/', validateSchemaMiddleware(rentalSchema), rentalsController.create)
    .get('/', rentalsController.getByCustomerOrGameId)
    .post('/:id/return', rentalsController.finish)
    .delete('/:id', rentalsController.exclude);

export { rentals };
