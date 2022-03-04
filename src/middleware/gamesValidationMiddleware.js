import connection from '../db.js';

export async function conflict(id) {
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
