import { Router } from 'express';
import createCustomer from '../controllers/customersController.js';
import validateSchemaMiddleware from '../middleware/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.post(
    '/customers',
    validateSchemaMiddleware(customerSchema),
    createCustomer
);

export default customersRouter;
