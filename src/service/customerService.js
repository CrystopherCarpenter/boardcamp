import customerRepository from '../repository/customerRepository.js';

const create = async (customer) => {
    const [data] = await getByCpf(customer.cpf);

    if (data) throw 409;

    return await customerRepository.insert(customer);
};

const getByCpfOrGetAll = async (cpf) => {
    if (cpf) return await getByCpf(cpf);

    return await getAll();
};

const getAll = async () => {
    const { rows } = await customerRepository.getAll();
    return rows;
};

const getByCpf = async (cpf) => {
    const { rows } = await customerRepository.getByCpf(cpf);
    return rows;
};

const getById = async (id) => {
    const { rows } = await customerRepository.getById(id);
    if (!rows[0]) throw 404;

    return rows[0];
};

const update = async (customer) => {
    const [data] = await getByCpf(customer.cpf);
    if (!data || customer.id != data.id) throw 409;

    await customerRepository.update(customer);

    return;
};

const customerService = {
    create,
    getByCpfOrGetAll,
    getByCpf,
    getById,
    update,
};

export default customerService;
