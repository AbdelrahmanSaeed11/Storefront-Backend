import { Products, product } from "../../models/products";

const myProd = new Products();

describe('Test products model', () => {
    it('Test index method to be defined', () => {
        expect(myProd.index).toBeDefined();
    })
    
    it('Test show method to be defined', () => {
        expect(myProd.show).toBeDefined();
    })
    
    it('Test create method to be defined', () => {
        expect(myProd.create).toBeDefined();
    })

    it('Test update method to be defined', () => {
        expect(myProd.update).toBeDefined();
    })

    it('Test delete method to be defined', () => {
        expect(myProd.delete).toBeDefined();
    })

    it('Test get top five product method to be defined', () => {
        expect(myProd.top5Prod).toBeDefined();
    })

    it('Test get product by category to be defined', () => {
        expect(myProd.prodByCat).toBeDefined();
    })

    it('Test that create method work', async () => {
        const inputProd: product = {
            name: 'mango',
            price: 5,
            category: 'drinks',
        }
        const retProd: product = {
            id: 1,
            name: 'mango',
            price: 5,
            category: 'drinks',
        }
        const ret = await myProd.create(inputProd);
        expect(ret).toEqual(retProd);
    })

    it('Test that index method work', async () => {
        const ret = await myProd.index();
        expect(ret).toEqual([{
            id: 1,
            name: 'mango',
            price: 5,
            category: 'drinks',
        }]);
    })

    it('Test that show method work', async () => {
        const retProd: product = {
            id: 1,
            name: 'mango',
            price: 5,
            category: 'drinks',
        }
        const ret = await myProd.show('1');
        expect(ret).toEqual(retProd);
    })

    it('Test that update method work', async () => {
        const ret = await myProd.update({
            id: 1,
            name: 'Strawberry',
            price: 5,
            category: 'juice',
        });
        expect(ret).toEqual({
            id: 1,
            name: 'Strawberry',
            price: 5,
            category: 'juice',
        });
    })

    it('Test that get top five products method work', async () => {
        const ret = await myProd.top5Prod();
        expect(ret).toEqual([{
            id: 1,
            name: 'Strawberry',
            price: 5,
            category: 'juice',
            popularity: 0,
        }]);
    })

    it('Test that get product by category method work', async () => {
        const ret = await myProd.prodByCat('juice');
        expect(ret).toEqual([{
            id: 1,
            name: 'Strawberry',
            price: 5,
            category: 'juice',
        }])
    })

    it('Test that delete method work', async () => {
        const ret = await myProd.delete('1');
        expect(ret).toEqual({
            id: 1,
            name: 'Strawberry',
            price: 5,
            category: 'juice',
        })
    })
})