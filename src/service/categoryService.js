import categoryRepository from '../repository/categoryRepository.js';

const create = async (name) => {
    const category = await getByName(name);

    if (category) throw 409;

    return await categoryRepository.insert(name);
};

const getByName = async (name) => {
    const { rows } = await categoryRepository.getByName(name);
    return rows[0];
};

const getById = async (id) => {
    const { rows } = await categoryRepository.getById(id);
    return rows[0];
};

const getAll = async () => {
    const { rows } = await categoryRepository.getAll();
    return rows;
};

const categoryService = {
    create,
    getAll,
    getById,
};

export default categoryService;
