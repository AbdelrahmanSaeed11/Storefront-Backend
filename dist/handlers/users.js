"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const myUser = new users_1.Users();
const usersRouter = (app) => {
    app.get('/api/users', authenticate_1.default, index);
    app.get('/api/users/:id', authenticate_1.default, show);
    app.post('/api/users', create);
    app.post('/api/users/login', login);
    app.put('/api/users', authenticate_1.default, update);
    app.delete('/api/users/:id', authenticate_1.default, deleteUser);
};
const index = async (_req, res) => {
    try {
        const ret = await myUser.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const show = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error(`id Parametar should be provided`);
        }
        const ret = await myUser.show(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const create = async (req, res) => {
    try {
        const schema = joi_1.default.object({
            user_name: joi_1.default.string().required(),
            first_name: joi_1.default.string().required(),
            last_name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        await schema.validateAsync(req.body);
        const ret = await myUser.create(req.body);
        const retToken = jsonwebtoken_1.default.sign({ user: ret }, process.env.jwt_token);
        res.json(retToken);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const login = async (req, res) => {
    try {
        const schema = joi_1.default.object({
            user_name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        await schema.validateAsync(req.body);
        const ret = await myUser.login(req.body.user_name, req.body.password);
        const retToken = jsonwebtoken_1.default.sign({ user: ret }, process.env.jwt_token);
        res.json(retToken);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const update = async (req, res) => {
    try {
        const schema = joi_1.default.object({
            id: joi_1.default.number().required(),
            user_name: joi_1.default.string().required(),
            first_name: joi_1.default.string().required(),
            last_name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        await schema.validateAsync(req.body);
        const ret = await myUser.update(req.body);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error(`id Parametar should be provided`);
        }
        const ret = await myUser.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
exports.default = usersRouter;
