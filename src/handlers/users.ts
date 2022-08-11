import express, {Request, Response} from 'express'
import { Users, user } from "../models/users";
import jwtAuth from '../middleware/authenticate';
import jwt from 'jsonwebtoken'
import joi from 'joi'

const myUser = new Users();

const usersRouter = (app: express.Application) => {
    app.get('/api/users', jwtAuth, index);
    app.get('/api/users/:id', jwtAuth, show);
    app.post('/api/users', create);
    app.post('/api/users/login', login);
    app.put('/api/users', jwtAuth, update);
    app.delete('/api/users/:id', jwtAuth, deleteUser);
}

const index = async (_req: Request, res: Response) => {
    try {
        const ret = await myUser.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error(`id Parametar should be provided`);
        }
        const ret = await myUser.show(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const schema = joi.object({
            user_name: joi.string().required(),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            password: joi.string().required(),
        })
        await schema.validateAsync(req.body);
        const ret = await myUser.create(req.body as user);
        const retToken = jwt.sign({ user: ret }, process.env.jwt_token as string);
        res.json(retToken);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const schema = joi.object({
            user_name: joi.string().required(),
            password: joi.string().required(),
        });
        await schema.validateAsync(req.body);
        const ret = await myUser.login(req.body.user_name, req.body.password);
        const retToken = jwt.sign({ user: ret }, process.env.jwt_token as string)
        res.json(retToken);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const schema = joi.object({
            id: joi.number().required(),
            user_name: joi.string().required(),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            password: joi.string().required(),
        });
        await schema.validateAsync(req.body);
        const ret = await myUser.update(req.body as user);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            throw new Error(`id Parametar should be provided`);
        }
        const ret = await myUser.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send((err as Error).message);
    }
}

export default usersRouter;