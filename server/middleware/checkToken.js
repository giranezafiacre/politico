import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import query from '../db/index';

dotenv.config();
export const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            status: 401,
            error: 'Token not provided',
        });
    }
    try {
        const verified = jwt.verify(authorization, process.env.secret);
        req.tokenData = verified;
        const selectQuery = 'SELECT * FROM users WHERE id=$1';
        const value = [req.tokenData.id];
        const userFound = await query(selectQuery, value);
        if (!userFound[0]) {
            return res.status(403).json({
                status: 403,
                error: 'You are not authorized to perform this task',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message,
        });
    }
};
export default checkToken;
