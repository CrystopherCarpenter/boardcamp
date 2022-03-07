import connection from '../db.js';

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const {
            rows: [customer],
        } = await connection.query(
            `
            SELECT * FROM customers WHERE cpf = $1
            `,
            [cpf]
        );

        if (!customer) {
            await connection.query(
                `
                INSERT INTO 
                customers (name, phone, cpf, birthday) 
                VALUES ($1, $2, $3, $4)
                `,
                [name, phone, cpf, birthday]
            );

            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCustomers(req, res) {
    const { cpf } = req.query;
    try {
        if (cpf) {
            const { rows } = await connection.query(
                `
                SELECT * FROM customers WHERE cpf LIKE $1
                `,
                [`${cpf}%`]
            );
            res.send(rows);
        } else {
            const { rows } = await connection.query(
                `
                SELECT * FROM customers
                `
            );
            res.send(rows);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params;
    try {
        const {
            rows: [customer],
        } = await connection.query(
            `
            SELECT * FROM customers WHERE id=$1
            `,
            [id]
        );
        if (!customer) {
            res.sendStatus(404);
        } else {
            res.send(customer);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    try {
        const {
            rows: [customer],
        } = await connection.query(
            `
            SELECT * FROM customers WHERE cpf=$1 AND id!=$2
            `,
            [cpf, id]
        );

        if (!customer) {
            await connection.query(
                `
                UPDATE customers 
                SET name=$1, phone=$2, cpf=$3, birthday=$4  
                WHERE id=$5
                `,
                [name, phone, cpf, birthday, id]
            );

            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
