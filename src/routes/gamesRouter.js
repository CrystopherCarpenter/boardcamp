import { Router } from 'express';
import * as gamesController from '../controllers/gamesController.js';
import { validateSchemaMiddleware } from '../middleware/validateSchemaMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const games = Router();

games
    .post('/', validateSchemaMiddleware(gameSchema), gamesController.create)
    .get('/', gamesController.getByNameOrGetAll);

export { games };
