import { Router } from 'express';
import customersRouter from './customersRouter.js';
import categoriesRouter from './categoriesRouter.js';
import gamesRouter from './gamesRouter.js';

const router = Router();
router.use(customersRouter);
router.use(categoriesRouter);
router.use(gamesRouter);

export default router;
