import Database from "../database";

export type product = {
    id?: number;
    name: string;
    price: number;
    category: string;
    popularity?: number;
}

export class Products {
    async index(): Promise<product[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products`;
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get the products: ${(err as Error).message}`);
        }
    }
    async show(product_id: string): Promise<product> {
        try {
            const connecttion = await Database.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products WHERE id=$1`;
            const ret = await connecttion.query(sqlCommand, [product_id]);
            connecttion.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't get the product: ${(err as Error).message}`);
        }
    }
    async create(p: product): Promise<product> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `INSERT INTO products(name, price, category)
                VALUES($1, $2, $3) RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [p.name, p.price, p.category]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create the product: ${(err as Error).message}`);
        }
    }
    async update(p: product): Promise<product> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `UPDATE products 
            SET name=$1, price=$2, category=$3 WHERE id=$4
            RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [p.name, p.price, p.category, p.id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update this product: ${(err as Error).message}`)
        }
    }
    async delete(product_id: string): Promise<product> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `DELETE FROM products WHERE id=$1 RETURNING id, name, price, category`;
            const ret = await connection.query(sqlCommand, [product_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't delete this product: ${(err as Error).message}`)

        }
    }
    // get top 5 most popular products
    async top5Prod(): Promise<product[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `SELECT * FROM products ORDER BY popularity DESC LIMIT 5`;
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Something went wrong: ${(err as Error).message}`)
        }
    }
    // get all products that have a specific category
    async prodByCat(category: string): Promise<product[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = `SELECT id, name, price, category FROM products WHERE category=$1`;
            const ret = await connection.query(sqlCommand, [category]);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get products in this category: ${(err as Error).message}`)
        }
    }
}