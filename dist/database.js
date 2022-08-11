"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let Database = new pg_1.Pool();
const { postgres_host, postgres_db, postgres_db_test, postgres_user, postgres_password, postgres_port, ENV, } = process.env;
console.log(ENV);
if (ENV === 'dev') {
    Database = new pg_1.Pool({
        host: postgres_host,
        database: postgres_db,
        user: postgres_user,
        password: postgres_password,
        port: parseInt(postgres_port),
    });
}
if (ENV === 'test') {
    Database = new pg_1.Pool({
        host: postgres_host,
        database: postgres_db_test,
        user: postgres_user,
        password: postgres_password,
        port: parseInt(postgres_port),
    });
}
exports.default = Database;
