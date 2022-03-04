import { Router } from 'express';
import {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
} from '../controllers/customersController.js';
import validateSchemaMiddleware from '../middleware/validateSchemaMiddleware.js';
import customerSchema from '../schemas/customerSchema.js';

const customersRouter = Router();

customersRouter.post(
    '/customers',
    validateSchemaMiddleware(customerSchema),
    createCustomer
);

customersRouter.get('/customers', getCustomers);

customersRouter.get('/customers/:id', getCustomer);

customersRouter.put(
    '/customers/:id',
    validateSchemaMiddleware(customerSchema),
    updateCustomer
);

export default customersRouter;
