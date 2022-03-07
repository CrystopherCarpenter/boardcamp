import connection from '../db.js';
import dayjs from 'dayjs';

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
            SELECT * FROM rentals WHERE id=$1
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
            SELECT * FROM rentals WHERE id=$1
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

export async function delayFeeCalc(id, today) {
    const { rows } = await connection.query(
        `
        SELECT rentals.*, games."pricePerDay" 
        FROM rentals
        JOIN games ON games.id = "gameId"
        WHERE rentals.id=$1
         `,
        [id]
    );
    const { pricePerDay, daysRented, rentDate } = rows[0];
    const expectedReturnDate = dayjs(rentDate).add(daysRented, 'day').$d;
    const returnDate = dayjs(today).$d;
    const delayVerification = expectedReturnDate <= returnDate;

    if (delayVerification) {
        const delayDays = (returnDate - expectedReturnDate) / 86400000;
        const delayFee = pricePerDay * delayDays;

        return delayFee;
    }

    return 0;
}
