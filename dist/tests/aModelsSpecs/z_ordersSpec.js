"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const newOrder = new orders_1.Orders();
const myuser = new users_1.Users();
const myProd = new products_1.Products();
describe('Test orders model', () => {
    // create user and product to use them in testing the orders model
    beforeAll(async () => {
        const inputUser = {
            user_name: 'user_order_test',
            first_name: 'uot_fn',
            last_name: 'uot_ln',
            password: 'uot_password',
        };
        const retUser = await myuser.create(inputUser);
        const inputProd = {
            name: 'product_order_test',
            price: 5,
            category: 'pot_category',
        };
        const retProd = await myProd.create(inputProd);
    });
    // delete the user and product that used for testing orders model
    afterAll(async () => {
        const retUser = await myProd.delete('2');
        const retProd = await myuser.delete('2');
    });
    it('Test that create method work', async () => {
        const ret = await newOrder.create('2');
        expect(ret).toEqual({
            id: 1,
            user_id: 2,
            status: 'active',
        });
    });
    it('Test that add product method work', async () => {
        const ret = await newOrder.addProduct('1', '2', 15);
        expect(ret).toEqual({
            id: 1,
            quantity: 15,
            order_id: 1,
            product_id: 2,
        });
    });
    it('Test that current order method work', async () => {
        const ret = await newOrder.currOrder('2');
        expect(ret).toEqual({
            id: 1,
            user_id: 2,
            status: 'active',
            products: [{
                    id: 2,
                    name: 'product_order_test',
                    price: 5,
                    category: 'pot_category',
                    quantity: 15,
                }]
        });
    });
    it('Test that update status method work', async () => {
        const ret = await newOrder.updateStatus('1');
        expect(ret).toEqual({
            id: 1,
            user_id: 2,
            status: 'completed',
        });
    });
    it('Test that completed orders method work', async () => {
        const ret = await newOrder.completedOrders('2');
        expect(ret).toEqual([{
                id: 1,
                user_id: 2,
                status: 'completed',
            }]);
    });
    it('Test that index method work', async () => {
        const ret = await newOrder.index();
        expect(ret).toEqual([{
                id: 1,
                user_id: 2,
                status: 'completed',
            }]);
    });
    it('Test that delete method work', async () => {
        const ret = await newOrder.delete('1');
        expect(ret).toEqual({
            id: 1,
            user_id: 2,
            status: 'completed',
        });
    });
});
