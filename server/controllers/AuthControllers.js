import dotenv from 'dotenv';
import { query } from '../db/index';
import checkPassword from '../helpers/checkPassword';
import hashPassword from '../helpers/hashPassword';
import generateToken from '../helpers/generateToken';

dotenv.config();
class UsersClass {
    async createUser(req, res) {
        const {
            nationalId, firstname, lastname, othername, email, phonenumber, passportUrl, password,
        } = req.body;
        const selectQuery = 'SELECT * FROM users where nationalId=$1;';
        const value = [nationalId];
        const rows = await query(selectQuery, value);
        if (rows[0]) {
            return res.status(409).json({
                status: 409,
                error: `user with ${nationalId} already exists`,
            });
        }
        const lastName = lastname.trim();
        const firstName = firstname.trim();
        const isAdmin = false;
        const hashedPassword = hashPassword(password);
        const insertQuery = 'INSERT INTO users (nationalId, firstname, lastname, othername, email, phonenumber, passportUrl, password, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
        const result = await query(insertQuery, [nationalId, firstname, lastname, othername, email, phonenumber, passportUrl, hashedPassword, isAdmin]);
        const { id } = result[0];
        const token = generateToken(id, nationalId, isAdmin);
        return res.status(201).json({
            status: 201,
            message: 'User created',
            data: {
                firstName,
                lastName,
                othername,
                email,
                token,
            },
        });
    }

    async login(req, res) {
        const { nationalId, email, password } = req.body;
        if (nationalId === '' && email === '') {
            return res.status(400).json({
                status: 400,
                message: 'enter email or nationalID',

            });
        }
        const selectQuery = 'SELECT * FROM users where nationalId=$1 or email=$2 ;';
        const value = [nationalId, email];
        const rows = await query(selectQuery, value);
        if (rows[0] && checkPassword(password, rows[0].password)) {
            const { id } = rows[0];
            const token = generateToken(id, rows[0].nationalId, rows[0].email, rows[0].isadmin);
            return res.status(200).json({
                status: 200,
                message: 'User logged in successfully',
                data: {
                    id,
                    nationalId,
                    token,
                },
            });
        }
        return res.status(400).json({
            status: 400,
            error: 'Invalid email,nationalId or password',
        });
    }
}
export default UsersClass;
