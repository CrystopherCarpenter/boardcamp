import connection from '../db.js';

export async function conflict(id) {
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
