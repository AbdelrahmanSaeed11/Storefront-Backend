import supertest from 'supertest'
import { product } from '../../models/products';
import app from '../../server'

const request = supertest(app);

describe('Test products handler', () => {
    it('Test create route', async () => {
        const retProd = {
            id: 3,
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        }
        const ret = await request.post('/api/products').send({
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual(retProd as product);
    })

    it('Test show route', async () => {
        const retProd = {
            id: 3,
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        }
        const ret = await request.get('/api/products/3');
        expect(ret.body).toEqual(retProd as product);
    })

    it('Test index route', async () => {
        const ret = await request.get('/api/products');
        expect(ret.body).toEqual([
            {
                id: 3,
                name: 'pepsi',
                price: 6,
                category: 'soda drinks',
            }
        ]);
    })

    it('Test update route', async () => {
        const ret = await request.put('/api/products')
            .send({
                id: 3,
                name: 'coca-cola',
                price: 7,
                category: 'soda-drinks',
            })
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 3,
            name: 'coca-cola',
            price: 7,
            category: 'soda-drinks',
        });
    });

    it('Test top five products route', async () => {
        const ret = await request.get('/api/top/products');
        expect(ret.body).toEqual([{
            id: 3,
            name: 'coca-cola',
            price: 7,
            category: 'soda-drinks',
            popularity: 0,
        }]);
    })

    it('Test get product by category route', async () => {
        const ret = await request.get('/api/products/category/soda-drinks');
        expect(ret.body).toEqual([{
            id: 3,
            name: 'coca-cola',
            price: 7,
            category: 'soda-drinks',
        }])
    });

    it('Test delete route', async () => {
        const ret = await request.delete('/api/products/3')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 3,
            name: 'coca-cola',
            price: 7,
            category: 'soda-drinks',
        })
    })
})