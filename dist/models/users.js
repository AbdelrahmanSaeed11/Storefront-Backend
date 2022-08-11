"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { salt_rounds: salt, pepper_password: pepper, } = process.env;
class Users {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = 'SELECT id, user_name, first_name, last_name FROM users';
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get the users: ${err.message}`);
        }
    }
    async show(user_id) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `SELECT id, user_name, first_name, last_name FROM users WHERE id=$1`;
            const ret = await connection.query(sqlCommand, [user_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't get the user: ${err.message}`);
        }
    }
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `INSERT INTO users(user_name, first_name, last_name, password)
                VALUES($1, $2, $3, $4) RETURNING id, user_name, first_name, last_name`;
            const hashedPass = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            const ret = await connection.query(sqlCommand, [u.user_name, u.first_name, u.last_name, hashedPass]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create the user: ${err.message}`);
        }
    }
    async login(user_name, password) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = 'SELECT * FROM users WHERE user_name=$1';
            const ret = await connection.query(sqlCommand, [user_name]);
            connection.release();
            if (ret.rows.length) {
                if (bcrypt_1.default.compareSync(password + pepper, ret.rows[0].password)) {
                    const retUser = {
                        id: ret.rows[0].id,
                        user_name: user_name,
                        first_name: ret.rows[0].first_name,
                        last_name: ret.rows[0].last_name,
                    };
                    return retUser;
                }
                else
                    throw new Error(`User password is incorrect`);
            }
            return null;
        }
        catch (err) {
            throw new Error(`Can't login this user: ${err.message}`);
        }
    }
    async update(u) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `UPDATE users SET user_name=$1, first_name=$2, last_name=$3, password=$4
            WHERE id=$5
            RETURNING id, user_name, first_name, last_name`;
            const hashedPass = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            const ret = await connection.query(sqlCommand, [u.user_name, u.first_name, u.last_name, hashedPass, u.id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't udpate this user: ${err.message}`);
        }
    }
    async delete(user_id) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = 'DELETE FROM users WHERE id=$1 RETURNING id, user_name, first_name, last_name';
            const ret = await connection.query(sqlCommand, [user_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't delete this user: ${err.message}`);
        }
    }
}
exports.Users = Users;
