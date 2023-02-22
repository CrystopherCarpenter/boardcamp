import customerService from '../service/customerService.js';

export async function create(req, res) {
    const customer = req.body;

    await customerService.create(customer);

    return res.sendStatus(201);
}

export async function getByCpfOrGetAll(req, res) {
    const { cpf } = req.query;
    const response = await customerService.getByCpfOrGetAll(cpf);

    return res.send(response);
}

export async function getById(req, res) {
    const { id } = req.params;
    const response = await customerService.getById(id);

    return res.send(response);
}

export async function update(req, res) {
    const { id } = req.params;
    const customer = { ...req.body, id };
    await customerService.update(customer);

    return res.sendStatus(200);
}
