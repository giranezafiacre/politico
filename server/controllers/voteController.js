import dotenv from 'dotenv';
import { query } from '../db/index';

dotenv.config();
class VotersClass {
    async createVote(req, res) {
        let date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth()).padStart(2, '0');
        const yyyy = date.getFullYear();
        date = `${mm}/${dd}/${yyyy}`;
        const {
            createdOn, createdBy, office, candidate,
        } = req.body;

        const selectQuery = 'SELECT * FROM users where id=$1;';
        const value = [createdBy];
        const rows = await query(selectQuery, value);
        if (!rows[0]) {
            return res.status(403).json({
                status: 403,
                error: 'Forbiden',
            });
        }
        const selectQuery1 = 'SELECT * FROM office where id=$1;';
        const value1 = [office];
        const rows1 = await query(selectQuery1, value1);
        if (!rows1[0]) {
            return res.status(404).json({
                status: 404,
                error: 'office not found',
            });
        }
        const selectQuery2 = 'SELECT * FROM candidate where id=$1;';
        const value2 = [candidate];
        const rows2 = await query(selectQuery2, value2);
        if (!rows2[0]) {
            return res.status(404).json({
                status: 404,
                error: 'candidate not found',
            });
        }
        const selectQuery3 = 'SELECT * FROM vote where createdBy=$1;';
        const value3 = [createdBy];
        const rows3 = await query(selectQuery3, value3);
        if (rows3[0]) {
            return res.status(403).json({
                status: 403,
                error: 'you have already voted',
            });
        }
        const insertQuery = 'INSERT INTO vote (createdOn​,createdBy,office, candidate) VALUES ($1, $2, $3,$4) RETURNING *;';
        const result = await query(insertQuery, [date, createdBy, office, candidate]);

        const { id } = result[0];
        return res.status(201).json({
            status: 201,
            message: 'vote succesfully done',
            data: {
                createdOn,
                office,
                candidate,
                id,
            },
        });
    }
}
export default VotersClass;
