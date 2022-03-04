import connection from '../db.js';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const customer = await customerValidation(customerId);
    const game = await gameValidation(gameId);
    const rental = await rentalValidation(gameId);

    try {
        if (customer && game && rental) {
            const {
                rows: [price],
            } = await connection.query(
                `
                SELECT "pricePerDay" FROM games WHERE id = $1
                `,
                [gameId]
            );

            const originalPrice = daysRented * price.pricePerDay;
            await connection.query(
                `
                INSERT INTO 
                rentals ("customerId", "gameId", "daysRented", "rentDate","originalPrice", "returnDate", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                `,
                [
                    customerId,
                    gameId,
                    daysRented,
                    today,
                    originalPrice,
                    null,
                    null,
                ]
            );

            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;
    res.send(`${customerId}, ${gameId}`);
    // try {
    // } catch (error) {
    //     res.status(500).send(error);
    // }
}

export async function endRental(req, res) {}

export async function deleteRental(req, res) {}

async function customerValidation(id) {
    try {
        const { rows } = await connection.query(
            `
            SELECT * FROM customers WHERE id=$1
            `,
            [id]
        );
        if (rows[0]) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}
async function gameValidation(id) {
    try {
        const { rows } = await connection.query(
            `
            SELECT * FROM games WHERE id=$1
            `,
            [id]
        );
        if (rows[0]) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}
async function rentalValidation(id) {
    try {
        const { rows: rentals } = await connection.query(
            `
            SELECT * FROM rentals WHERE "gameId"=$1
            `,
            [id]
        );

        const { rows: games } = await connection.query(
            `
            SELECT "stockTotal" FROM games WHERE id=$1
            `,
            [id]
        );

        if (rentals.length < games[0].stockTotal) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
