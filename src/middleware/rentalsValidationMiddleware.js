import connection from '../db.js';

export async function stock(id) {
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

export async function conflict(id) {
    try {
        const { rows } = await connection.query(
            `
            SELECT * FROM rentals WHERE id = $1
            `,
            [id]
        );
        if (rows[0]) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function rentalReturn(id) {
    try {
        const { rows } = await connection.query(
            `
            SELECT * FROM rentals WHERE id = $1
            `,
            [id]
        );
        if (rows[0].returnDate !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
