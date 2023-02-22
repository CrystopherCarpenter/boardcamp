import connection from '../config/database.js';

const insert = ({ customerId, gameId, daysRented, originalPrice, date }) => {
    return connection.query(
        `
                INSERT INTO 
                rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                `,
        [customerId, gameId, daysRented, date, originalPrice, null, null]
    );
};

const getAllActiveByGameId = (id) => {
    return connection.query(
        `
            SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL
            `,
        [id]
    );
};

const getAll = () => {
    return connection.query(
        `SELECT rentals.*, 
                customers.name AS "customerName", 
                games.name AS "gameName",
                games."categoryId",
                categories."name" AS "categoryName"
                FROM rentals
                JOIN customers ON customers.id = rentals."customerId"
                JOIN games ON games.id = rentals."gameId"
                JOIN categories ON categories.id = games."categoryId"`
    );
};

const getByCustomerId = (id) => {
    return connection.query(
        `SELECT rentals.*, 
                customers.name AS "customerName", 
                games.name AS "gameName",
                games."categoryId",
                categories."name" AS "categoryName"
                FROM rentals
                JOIN customers ON customers.id = rentals."customerId"
                JOIN games ON games.id = rentals."gameId"
                JOIN categories ON categories.id = games."categoryId"
                WHERE rentals."customerId"=$1`,
        [id]
    );
};

const getByGameId = (id) => {
    return connection.query(
        `SELECT rentals.*, 
                customers.name AS "customerName", 
                games.name AS "gameName",
                games."categoryId",
                categories."name" AS "categoryName"
                FROM rentals
                JOIN customers ON customers.id = rentals."customerId"
                JOIN games ON games.id = rentals."gameId"
                JOIN categories ON categories.id = games."categoryId"
               WHERE rentals."gameId"=$1`,
        [id]
    );
};

const getById = (id) => {
    return connection.query(
        `
            SELECT * FROM rentals WHERE "id"=$1
            `,
        [id]
    );
};
const update = (date, delayFee, id) => {
    return connection.query(
        `
                    UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3
                    `,
        [date, delayFee, id]
    );
};

const exclude = (id) => {
    return connection.query(
        `
            DELETE FROM rentals WHERE id=$1
            `,
        [id]
    );
};

const rentalRepository = {
    insert,
    getAllActiveByGameId,
    getAll,
    getByCustomerId,
    getByGameId,
    getById,
    update,
    exclude,
};

export default rentalRepository;
