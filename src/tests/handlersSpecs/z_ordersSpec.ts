import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Test orders handler', () => {
    // create user and product to use them in testing the orders model
    beforeAll(async () => {
        const retProd = await request.post('/api/products').send({
            name: 'Product4_order_test',
            price: 6,
            category: 'pot4_category',
        }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);

        const retUser = await request.post('/api/users')
            .send({
                user_name: 'user4_order_test',
                first_name: 'uot4_fn',
                last_name: 'uot4_ln',
                password: 'uot4_password123',
            })
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
    })

    it('Test create route', async () => {
        const ret = await request.post('/api/orders')
            .send({
                user_id: '4'
            }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 2,
            user_id: 4,
            status: 'active',
        });
    })

    it('Test add product route', async () => {
        const ret = await request.post('/api/orders/product')
            .send({
                order_id: '2',
                product_id: '4',
                quantity: 20,
            }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 2,
            quantity: 20,
            order_id: 2,
            product_id: 4,
        });
    })

    it('Test current order route', async () => {
        const ret = await request.get('/api/orders/current/4')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 2,
            user_id: 4,
            status: 'active',
            products: [{
                id: 4,
                name: 'Product4_order_test',
                price: 6,
                category: 'pot4_category',
                quantity: 20,
            }]
        })
    })

    it('Test update status route', async () => {
        const ret = await request.put('/api/orders/status')
            .send({
                order_id: 2,
            }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 2,
            user_id: 4,
            status: 'completed',
        })
    })

    it('Test completed orders route', async () => {
        const ret = await request.get('/api/orders/completed/4')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual([{
            id: 2,
            user_id: 4,
            status: 'completed',
        }])
    })

    it('Test index route', async () => {
        const ret = await request.get('/api/orders')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual([{
            id: 2,
            user_id: 4,
            status: 'completed',
        }])
    })

    it('Test delete route', async () => {
        const ret = await request.delete('/api/orders/2')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 2,
            user_id: 4,
            status: 'completed',
        })
    })

})