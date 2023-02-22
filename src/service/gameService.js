import gameRepository from '../repository/gameRepository.js';
import categoryService from '../service/categoryService.js';

const create = async (game) => {
    const category = await categoryService.getById(game.categoryId);

    const [gameName] = await getByName(game.name);

    if (!category) throw 400;
    if (gameName) throw 409;

    await gameRepository.insert(game);

    return;
};

const getByNameOrGetAll = async (name) => {
    if (name) return await getByStartWithName(name);

    return await getAll();
};

const getAll = async () => {
    const { rows } = await gameRepository.getAll();
    return rows;
};

const getByName = async (name) => {
    const { rows } = await gameRepository.getByName(name);
    return rows;
};

const getByStartWithName = async (name) => {
    const { rows } = await gameRepository.getByStartWithName(name);
    return rows;
};

const getById = async (id) => {
    const { rows } = await gameRepository.getById(id);
    if (!rows[0]) throw 400;

    return rows[0];
};

const gameService = {
    create,
    getByNameOrGetAll,
    getById,
};

export default gameService;
