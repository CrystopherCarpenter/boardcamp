import connection from '../config/database.js';

const getById = (id) => {
    return connection.query(
        `
            SELECT * FROM games WHERE id=$1
            `,
        [id]
    );
};

const getByName = (name) => {
    return connection.query(
        `
                SELECT 
                games.*, 
                categories.name AS "categoryName" 
                FROM games 
                JOIN categories ON categories.id = games."categoryId"
                WHERE lower(games.name) LIKE lower($1)
                `,
        [name]
    );
};

const getByStartWithName = (name) => {
    return connection.query(
        `
                SELECT 
                games.*, 
                categories.name AS "categoryName" 
                FROM games 
                JOIN categories ON categories.id = games."categoryId"
                WHERE lower(games.name) LIKE lower($1)
                `,
        [`${name}%`]
    );
};

const getAll = () => {
    return connection.query(
        `
                SELECT 
                games.*, 
                categories.name AS "categoryName" 
                FROM games 
                JOIN categories ON categories.id = games."categoryId"
                `
    );
};

const insert = ({ name, image, stockTotal, pricePerDay, categoryId }) => {
    return connection.query(
        `
                    INSERT INTO 
                    games (name, image, "stockTotal", "pricePerDay", "categoryId") 
                    VALUES ($1, $2, $3, $4, $5)
                    `,
        [name, image, stockTotal, pricePerDay, categoryId]
    );
};

const gameRepository = {
    getById,
    getByName,
    getByStartWithName,
    getAll,
    insert,
};

export default gameRepository;
