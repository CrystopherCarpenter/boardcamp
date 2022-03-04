import { Router } from 'express';
import { createGame, getGames } from '../controllers/gamesController.js';
import validateSchemaMiddleware from '../middleware/validateSchemaMiddleware.js';
import gameSchema from '../schemas/gameSchema.js';

const gamesRouter = Router();

gamesRouter.post('/games', validateSchemaMiddleware(gameSchema), createGame);

gamesRouter.get('/games', getGames);

export default gamesRouter;
