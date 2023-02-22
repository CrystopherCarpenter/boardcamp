import categoryService from '../service/categoryService.js';

export async function create(req, res) {
    const { name } = req.body;

    await categoryService.create(name);

    return res.sendStatus(201);
}

export async function getAll(req, res) {
    const response = await categoryService.getAll();

    return res.send(response);
}
