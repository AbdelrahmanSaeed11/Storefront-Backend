"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const database_1 = __importDefault(require("../database"));
class Products {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products`;
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get the products: ${err.message}`);
        }
    }
    async show(product_id) {
        try {
            const connecttion = await database_1.default.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products WHERE id=$1`;
            const ret = await connecttion.query(sqlCommand, [product_id]);
            connecttion.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't get the product: ${err.message}`);
        }
    }
    async create(p) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `INSERT INTO products(name, price, category)
                VALUES($1, $2, $3) RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [p.name, p.price, p.category]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create the product: ${err.message}`);
        }
    }
    async update(p) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `UPDATE products 
            SET name=$1, price=$2, category=$3 WHERE id=$4
            RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [p.name, p.price, p.category, p.id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update this product: ${err.message}`);
        }
    }
    async delete(product_id) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `DELETE FROM products WHERE id=$1 RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [product_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't delete this product: ${err.message}`);
        }
    }
    // get top 5 most popular products
    async top5Prod() {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `SELECT * FROM products ORDER BY popularity DESC LIMIT 5`;
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Something went wrong: ${err.message}`);
        }
    }
    // get all products that have a specific category
    async prodByCat(category) {
        try {
            const connection = await database_1.default.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products WHERE category=$1`;
            const ret = await connection.query(sqlCommand, [category]);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get products in this category: ${err.message}`);
        }
    }
}
exports.Products = Products;
