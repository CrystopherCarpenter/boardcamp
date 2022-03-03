import connection from '../db.js';

export default async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const {
            rows: [customer],
        } = await connection.query(
            `
      SELECT * FROM customers WHERE cpf = ($1)
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
