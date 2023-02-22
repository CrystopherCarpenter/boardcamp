import connection from '../config/database.js';

const getByCpf = (cpf) => {
    return connection.query(
        `
            SELECT * FROM customers WHERE cpf LIKE $1
            `,
        [`${cpf}%`]
    );
};

const getById = (id) => {
    return connection.query(
        `
            SELECT * FROM customers WHERE id=$1
            `,
        [id]
    );
};

const getAll = () => {
    return connection.query(
        `
                SELECT * FROM customers
                `
    );
};

const update = ({ name, phone, cpf, birthday, id }) => {
    return connection.query(
        `
                UPDATE customers 
                SET name=$1, phone=$2, cpf=$3, birthday=$4  
                WHERE id=$5
                `,
        [name, phone, cpf, birthday, id]
    );
};

const insert = ({ name, phone, cpf, birthday }) => {
    return connection.query(
        `
                INSERT INTO 
                customers (name, phone, cpf, birthday) 
                VALUES ($1, $2, $3, $4)
                `,
        [name, phone, cpf, birthday]
    );
};

const customerRepository = {
    getByCpf,
    getById,
    getAll,
    update,
    insert,
};

export default customerRepository;
