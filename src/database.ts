import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

let Database: Pool = new Pool();

const {
    postgres_host,
    postgres_db,
    postgres_db_test,
    postgres_user,
    postgres_password,
    postgres_port,
    ENV,
} = process.env;
console.log(ENV);

if (ENV === 'dev') {
    Database = new Pool({
        host: postgres_host,
        database: postgres_db,
        user: postgres_user,
        password: postgres_password,
        port: parseInt(postgres_port as string),
    });
}

if (ENV === 'test') {
    Database = new Pool({
        host: postgres_host,
        database: postgres_db_test,
        user: postgres_user,
        password: postgres_password,
        port: parseInt(postgres_port as string),
    });
}

export default Database;