import connection from '../db.js';

export async function createGame(req, res) {
    const { name, image, stockTotal, pricePerDay, categoryId } = req.body;

    try {
        const {
            rows: [category],
        } = await connection.query(
            `
      SELECT * FROM categories WHERE id = $1
      `,
            [categoryId]
        );

        const {
            rows: [gameName],
        } = await connection.query(
            `
            SELECT * FROM games WHERE name = $1
            `,
            [name]
        );

        if (!category) {
            res.sendStatus(400);
        } else {
            if (!gameName) {
                await connection.query(
                    `
      INSERT INTO 
        games (name, image, "stockTotal", "pricePerDay", "categoryId") 
        VALUES ($1, $2, $3, $4, $5)
    `,
                    [name, image, stockTotal, pricePerDay, categoryId]
                );

                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getGames(req, res) {
    try {
        const { rows } = await connection.query(
            `
      SELECT * FROM games
      `
        );
        res.send(rows);
    } catch (error) {
        res.status(500).send(error);
    }
}
