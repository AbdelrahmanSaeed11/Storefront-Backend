"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Test products handler', () => {
    it('Test create route', async () => {
        const retProd = {
            id: 3,
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        };
        const ret = await request.post('/api/products').send({
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        }).set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual(retProd);
    });
    it('Test show route', async () => {
        const retProd = {
            id: 3,
            name: 'pepsi',
            price: 6,
            category: 'soda drinks',
        };
        const ret = await request.get('/api/products/3');
        expect(ret.body).toEqual(retProd);
    });
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
    });
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
    });
    it('Test get product by category route', async () => {
        const ret = await request.get('/api/products/category/soda-drinks');
        expect(ret.body).toEqual([{
                id: 3,
                name: 'coca-cola',
                price: 7,
                category: 'soda-drinks',
            }]);
    });
    it('Test delete route', async () => {
        const ret = await request.delete('/api/products/3')
            .set('authorization', `Bearer ${process.env.saved_jwttoken}`);
        expect(ret.body).toEqual({
            id: 3,
            name: 'coca-cola',
            price: 7,
            category: 'soda-drinks',
        });
    });
});
