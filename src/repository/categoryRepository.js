import connection from '../config/database.js';

const getByName = (name) => {
    return connection.query(
        `
            SELECT * FROM categories WHERE name = ($1)
            `,
        [name]
    );
};

const getById = (id) => {
    return connection.query(
        `
            SELECT * FROM categories WHERE id = ($1)
            `,
        [id]
    );
};

const insert = (name) => {
    return connection.query(
        `
                INSERT INTO 
                categories (name) 
                VALUES ($1)
                `,
        [name]
    );
};

const getAll = () => {
    return connection.query(
        `
            SELECT * FROM categories
            `
    );
};

const categoryRepository = {
    getByName,
    getById,
    insert,
    getAll,
};

export default categoryRepository;
