import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE_URL, NODE_ENV, TEST_DB_URL } = process.env;

const db = (NODE_ENV === 'development' || 'production') ? DATABASE_URL : TEST_DB_URL;

const pool = new Pool({ connectionString: db });
export default pool;
