import Database from "../database";
import bcrypt from 'bcrypt'

export type user = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password?: string;
}

const {
    salt_rounds: salt,
    pepper_password: pepper,
} = process.env;

export class Users {
    async index(): Promise<user[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'SELECT id, user_name, first_name, last_name FROM users';
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get the users: ${(err as Error).message}`);
        }
    }
    async show(user_id: string): Promise<user> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `SELECT id, user_name, first_name, last_name FROM users WHERE id=$1`;
            const ret = await connection.query(sqlCommand, [user_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't get the user: ${(err as Error).message}`);
        }
    }
    async create(u: user): Promise<user> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `INSERT INTO users(user_name, first_name, last_name, password)
                VALUES($1, $2, $3, $4) RETURNING id, user_name, first_name, last_name`;
            const hashedPass = bcrypt.hashSync((u.password as string) + pepper, parseInt(salt as string));
            const ret = await connection.query(sqlCommand, [u.user_name, u.first_name, u.last_name, hashedPass]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create the user: ${(err as Error).message}`);
        }
    }
    async login(user_name: string, password: string): Promise<user | null> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'SELECT * FROM users WHERE user_name=$1';
            const ret = await connection.query(sqlCommand, [user_name]);
            connection.release();
            if (ret.rows.length) {
                if (bcrypt.compareSync(password + pepper, ret.rows[0].password)) {
                    const retUser: user = {
                        id: ret.rows[0].id,
                        user_name: user_name,
                        first_name: ret.rows[0].first_name,
                        last_name: ret.rows[0].last_name,
                    }
                    return retUser;
                }
                else 
                    throw new Error(`User password is incorrect`)
            }
            return null;
        }
        catch (err) {
            throw new Error(`Can't login this user: ${(err as Error).message}`);
        }
    }
    async update(u: user): Promise<user> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `UPDATE users SET user_name=$1, first_name=$2, last_name=$3, password=$4
            WHERE id=$5
            RETURNING id, user_name, first_name, last_name`;
            const hashedPass = bcrypt.hashSync((u.password as string) + pepper, parseInt(salt as string));
            const ret = await connection.query(sqlCommand, [u.user_name, u.first_name, u.last_name, hashedPass, u.id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't udpate this user: ${(err as Error).message}`);
        }
    }
    async delete(user_id: string): Promise<user> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'DELETE FROM users WHERE id=$1 RETURNING id, user_name, first_name, last_name';
            const ret = await connection.query(sqlCommand, [user_id]);
            connection.release();
            return ret.rows[0]
        }
        catch (err) {
            throw new Error(`Can't delete this user: ${(err as Error).message}`);
        }
    }
}