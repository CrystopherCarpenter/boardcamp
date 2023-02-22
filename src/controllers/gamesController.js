import gameService from '../service/gameService.js';

export async function create(req, res) {
    const game = req.body;

    await gameService.create(game);

    return res.sendStatus(201);
}

export async function getByNameOrGetAll(req, res) {
    const { name } = req.query;
    const response = await gameService.getByNameOrGetAll(name);

    return res.send(response);
}
