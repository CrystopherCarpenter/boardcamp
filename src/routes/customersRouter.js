import { Router } from 'express';
import * as customerController from '../controllers/customersController.js';
import { validateSchemaMiddleware } from '../middleware/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customers = Router();

customers
    .post(
        '/',
        validateSchemaMiddleware(customerSchema),
        customerController.create
    )
    .get('/', customerController.getByCpfOrGetAll)
    .get('/:id', customerController.getById)
    .put(
        '/:id',
        validateSchemaMiddleware(customerSchema),
        customerController.update
    );

export { customers };
