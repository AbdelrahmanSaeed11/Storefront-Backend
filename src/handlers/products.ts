import express, {Request, Response} from 'express'
import jwtAuth from '../middleware/authenticate'
import { product, Products } from '../models/products'
import joi from 'joi'

const newProd = new Products();

const prodRounter = (app: express.Application) => {
    app.get('/api/products', index);
    app.get('/api/products/:id', show);
    app.post('/api/products', jwtAuth, create);
    app.put('/api/products', jwtAuth, update);
    app.delete('/api/products/:id', jwtAuth, deleteProd);
    app.get('/api/top/products', topFive);
    app.get('/api/products/category/:cat', prodByCat);
}

const index = async (_req: Request, res: Response) => {
    try { 
        const ret = await newProd.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error('id Parametar should be provided');
        }
        const ret = await newProd.show(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const shcema = joi.object({
            name: joi.string().required(),
            price: joi.number().integer().required(),
            category: joi.string().required(),
        });
        await shcema.validateAsync(req.body);
        const ret = await newProd.create(req.body as product);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const shcema = joi.object({
            id: joi.number().required(),
            name: joi.string().required(),
            price: joi.number().integer().required(),
            category: joi.string().required(),
        })
        await shcema.validateAsync(req.body);
        const ret = await newProd.update(req.body as product);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const deleteProd = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error('id Parametar should be provided');
        }
        const ret = await newProd.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const topFive = async (req: Request, res: Response) => {
    try {
        const ret = await newProd.top5Prod();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const prodByCat = async (req: Request, res: Response) => {
    try {
        if (!req.params.cat) {
            throw new Error('cat(for category) Parametar should be provided');
        }
        const ret = await newProd.prodByCat(req.params.cat);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

export default prodRounter;