import Database from "../database";

export type order = {
    id?: number;
    user_id: number;
    status: string;
};

export type prodInOrder = {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

export type fullOrder = {
    id: number;
    user_id: number;
    status: string;
    products?: prodInOrder[];
}

export type order_products = {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
}

export class Orders {
    async index(): Promise<order[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'SELECT * FROM orders';
            const ret = await connection.query(sqlCommand);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get the orders: ${(err as Error).message}`);
        }
    }
    async create(user_id: string): Promise<order> {
        try {
            const connection = await Database.connect();
            // check if there is an active order for this user
            let sqlCommand:string = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
            const check = await connection.query(sqlCommand, [user_id, 'active']);
            if (check.rows.length) {
                throw new Error('There is already an active order');
            }
            sqlCommand = 'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
            const ret = await connection.query(sqlCommand, [user_id, 'active']);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create this order: ${(err as Error).message}`);
        }
    }
    async updateStatus(order_id: string): Promise<order> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
            const ret = await connection.query(sqlCommand, ['completed', order_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update this order: ${(err as Error).message}`);
        }
    }
    async currOrder(user_id: string): Promise<fullOrder> {
        try {
            const connection = await Database.connect();
            // check if there is an active order for this user
            let sqlCommand:string = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
            const check = await connection.query(sqlCommand, [user_id, 'active']);
            if (!check.rows.length) {
                throw new Error('There is no an active order for this user');
            }
            const order: fullOrder = check.rows[0];
            sqlCommand = `SELECT products.id, name, price, category, quantity FROM products INNER JOIN order_products
                ON order_products.order_id=$1`;
            const ret = await connection.query(sqlCommand, [order.id]);
            connection.release();
            order.products = ret.rows;
            return order;
        }
        catch (err) {
            throw new Error(`Can't get current order for this user: ${(err as Error).message}`);
        }
    }
    async completedOrders(user_id: string): Promise<order[]> {
        try {
            const connection = await Database.connect();
            const sqlCommand = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
            const ret = await connection.query(sqlCommand, [user_id, 'completed']);
            connection.release();
            return ret.rows;
        }
        catch (err) {
            throw new Error(`Can't get completed orders for this user: ${(err as Error).message}`);
        }
    }
    async addProduct(order_id: string, product_id: string, quantity: number): Promise<order_products> {
        try {
            const connection = await Database.connect();
            // check if the given orderID is exsist, and if it exist is it active or not
            let sqlCommand = `SELECT status FROM orders WHERE id=$1`;
            const check = await connection.query(sqlCommand, [order_id]);
            if (!check.rows.length) {
                throw new Error('There in no order with this id');
            }
            if (check.rows[0].status === 'completed') {
                throw new Error('This order is completed');
            }
            sqlCommand = `INSERT INTO order_products(quantity, order_id, product_id)
                VALUES($1, $2, $3) RETURNING *`;
            const ret = await connection.query(sqlCommand, [quantity, order_id, product_id]);
            // increment the popularity of the product
            sqlCommand = `UPDATE products SET popularity=popularity + 1 WHERE id=$1`;
            await connection.query(sqlCommand, [product_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add this product: ${(err as Error).message}`);
        }
    }
    async delete(order_id: string): Promise<order> {
        try {
            const connection = await Database.connect();
            let sqlCommand: string = `DELETE FROM order_products WHERE order_id=$1`;
            await connection.query(sqlCommand, [order_id]);
            sqlCommand = `DELETE FROM orders WHERE id=$1 RETURNING *`;
            const ret = await connection.query(sqlCommand, [order_id]);
            connection.release();
            return ret.rows[0];
        }
        catch (err) {
            throw new Error(`Can't delete this order: ${(err as Error).message}`);
        }
    }
}