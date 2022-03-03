import { Router } from 'express';
import customersRouter from './customersRouter.js';

const router = Router();
router.use(customersRouter);

export default router;
