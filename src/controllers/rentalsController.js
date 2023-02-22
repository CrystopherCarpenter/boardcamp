import rentalService from '../service/rentalService.js';

export async function create(req, res) {
    const rental = req.body;

    await rentalService.create(rental);

    return res.sendStatus(201);
}

export async function getByCustomerOrGameId(req, res) {
    const data = req.query;
    const response = await rentalService.getByCustomerOrGameId(data);

    return res.send(response);
}

export async function finish(req, res) {
    const { id } = req.params;

    await rentalService.finish(id);

    return res.sendStatus(200);
}

export async function exclude(req, res) {
    const { id } = req.params;

    await rentalService.exclude(id);

    return res.sendStatus(200);
}
