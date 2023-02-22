import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import * as router from './routes/index.js';

const app = express();

app.use(cors())
    .use(express.json())
    .use('/customers', router.customers)
    .use('/categories', router.categories)
    .use('/games', router.games)
    .use('/rentals', router.rentals);

export default app;
