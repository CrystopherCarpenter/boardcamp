import { Router } from 'express';
import {
    createRental,
    deleteRental,
    endRental,
    getRentals,
} from '../controllers/rentalsController.js';
import validateSchemaMiddleware from '../middleware/validateSchemaMiddleware.js';
import rentalSchema from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.post(
    '/rentals',
    validateSchemaMiddleware(rentalSchema),
    createRental
);

//rentalsRouter.get('/rentals', getRentals);

//rentalsRouter.put(
//    '/rentals/:id/return',
//    validateSchemaMiddleware(rentalSchema),
//    endRental
//);

rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;
