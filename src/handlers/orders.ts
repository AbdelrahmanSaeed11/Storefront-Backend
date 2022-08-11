import express, {Request, Response} from 'express'
import jwtAuth from '../middleware/authenticate'
import { Orders } from '../models/orders'
import joi from 'joi'

const newOrder = new Orders();

const orderRouter = (app: express.Application) => {
    app.get('/api/orders', jwtAuth, index);
    app.post('/api/orders', jwtAuth, create);
    app.put('/api/orders/status', jwtAuth, updateStatus);
    app.get('/api/orders/current/:user_id', jwtAuth, currentOrder);
    app.get('/api/orders/completed/:user_id', jwtAuth, completedOrders);
    app.post('/api/orders/product', jwtAuth, addProduct);
    app.delete('/api/orders/:id', jwtAuth, deleteOrder);
}

const index = async (req: Request, res: Response) => {
    try { 
        const ret = await newOrder.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const create = async (req: Request, res: Response) => { 
    try { 
        if (!req.body.user_id) {
            throw new Error('The user_id missing in the request body');
        }
        const ret = await newOrder.create(req.body.user_id as string);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const updateStatus = async (req: Request, res: Response) => {
    try { 
        if (!req.body.order_id) {
            throw new Error('The order_id missing in the request body');
        }
        const ret = await newOrder.updateStatus(req.body.order_id as string);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const currentOrder = async (req: Request, res: Response) => {
    try { 
        if (!req.params.user_id) {
            throw new Error('The user_id missing in the url');
        }
        const ret = await newOrder.currOrder(req.params.user_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const completedOrders = async (req: Request, res: Response) => {
    try { 
        if (!req.params.user_id) {
            throw new Error('The user_id is missing in the url');
        }
        const ret = await newOrder.completedOrders(req.params.user_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try { 
        const shcema = joi.object({
            order_id: joi.string().required(),
            product_id: joi.string().required(),
            quantity: joi.number().required(),
        })
        await shcema.validateAsync(req.body);
        const {
            order_id,
            product_id,
            quantity,
        } = req.body;
        const ret = await newOrder.addProduct(order_id as string, product_id as string, quantity as number);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try { 
        if (!req.params.id) {
            throw new Error('The id is missing in the url');
        }
        const ret = await newOrder.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

export default orderRouter;