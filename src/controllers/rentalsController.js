import connection from '../db.js';
import { conflict as customerValidation } from '../middleware/customersValidationMiddleware.js';
import {
    stock,
    conflict as rentalValidation,
    rentalReturn,
    delayFeeCalc,
} from '../middleware/rentalsValidationMiddleware.js';
import { conflict as gameValidation } from '../middleware/gamesValidationMiddleware.js';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customer = await customerValidation(customerId);
        const game = await gameValidation(gameId);
        const rental = await stock(gameId);

        if (customer && game && rental) {
            const {
                rows: [price],
            } = await connection.query(
                `
                SELECT "pricePerDay" FROM games WHERE id=$1
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
    let where = ``;
    let response;

    try {
        if (customerId) {
            const { rows } = await connection.query(
                `
            SELECT rentals.*, 
            customers.name AS "customerName", 
            games.name AS "gameName",
            games."categoryId",
            categories."name" AS "categoryName"
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."customerId"=$1
            `,
                [customerId]
            );
            response = rows;
        } else if (gameId) {
            const { rows } = await connection.query(
                `
            SELECT rentals.*, 
            customers.name AS "customerName", 
            games.name AS "gameName",
            games."categoryId",
            categories."name" AS "categoryName"
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            WHERE rentals."gameId"=$1
            `,
                [gameId]
            );
            response = rows;
        } else {
            const { rows } = await connection.query(
                `
            SELECT rentals.*, 
            customers.name AS "customerName", 
            games.name AS "gameName",
            games."categoryId",
            categories."name" AS "categoryName"
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON categories.id = games."categoryId"
            `
            );
            response = rows;
        }
        res.send(
            response.map((row) => {
                const {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    customerName,
                    gameName,
                    categoryId,
                    categoryName,
                } = row;

                return {
                    id,
                    customerId,
                    gameId,
                    rentDate,
                    daysRented,
                    returnDate,
                    originalPrice,
                    delayFee,
                    customer: { id: customerId, name: customerName },
                    game: {
                        id: gameId,
                        name: gameName,
                        categoryId,
                        categoryName,
                    },
                };
            })
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function endRental(req, res) {
    const { id } = req.params;

    try {
        const rental = await rentalValidation(id);
        if (rental) {
            const returnedAlready = await rentalReturn(id);
            if (returnedAlready) {
                res.sendStatus(400);
            } else {
                const delayFee = await delayFeeCalc(id, today);

                await connection.query(
                    `
                    UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3
                    `,
                    [today, delayFee, id]
                );
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const rental = await rentalValidation(id);
        if (rental) {
            const returnedAlready = await rentalReturn(id);
            if (returnedAlready) {
                res.sendStatus(400);
            } else {
                await connection.query(
                    `
                    DELETE FROM rentals WHERE id=$1
                    `,
                    [id]
                );
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
