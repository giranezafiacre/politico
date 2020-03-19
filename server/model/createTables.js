/* eslint-disable no-irregular-whitespace */
import pool from '../db/config';

export const createTables = () => {
    const querry = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        nationalId character varying(20) NOT NULL,
        firstname character varying(50) NOT NULL,
        lastname character varying(50) NOT NULL,
        othername character varying(50),
        email character varying(50),
        phoneNumber character varying(50) NOT NULL,
        passportUrl character varying(50) NOT NULL,
        password character varying(1024) NOT NULL,
        isAdmin boolean NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS
    party(
        id serial,
        name character varying(50) NOT NULL,
        hqAddress character varying(50) NOT NULL,
        logoUrl character varying(50) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    office(
        id serial,
        type character varying(50) NOT NULL,
        name character varying(50) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    candidate(
        id serial,
        office integer NOT NULL,
        party integer NOT NULL,
        candidate integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    vote(
        id​ serial,
        createdOn​ character varying(50) NOT NULL,
        createdBy integer NOT NULL, 
        office integer NOT NULL, 
        candidate integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    petition(
        id​ serial,
        createdOn​ character varying(50) NOT NULL,
        createdBy integer NOT NULL, 
        office integer NOT NULL, 
        body character varying(50) NOT NULL
    );`;

    pool.query(querry)
        .then(() => console.log('Tables created'))
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
export default pool;
require('make-runnable');
