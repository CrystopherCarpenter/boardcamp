import connection from '../db.js';

export async function createCategory(req, res) {
    const { name } = req.body;

    try {
        const {
            rows: [category],
        } = await connection.query(
            `
      SELECT * FROM categories WHERE name = ($1)
      `,
            [name]
        );

        if (!category) {
            await connection.query(
                `
      INSERT INTO 
        categories (name) 
        VALUES ($1)
    `,
                [name]
            );

            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getCategories(req, res) {
    try {
        const { rows } = await connection.query(
            `
      SELECT * FROM categories
      `
        );
        res.send(rows);
    } catch (error) {
        res.status(500).send(error);
    }
}
