"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const products_1 = require("../models/products");
const joi_1 = __importDefault(require("joi"));
const newProd = new products_1.Products();
const prodRounter = (app) => {
    app.get('/api/products', index);
    app.get('/api/products/:id', show);
    app.post('/api/products', authenticate_1.default, create);
    app.put('/api/products', authenticate_1.default, update);
    app.delete('/api/products/:id', authenticate_1.default, deleteProd);
    app.get('/api/top/products', topFive);
    app.get('/api/products/category/:cat', prodByCat);
};
const index = async (_req, res) => {
    try {
        const ret = await newProd.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const show = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('id Parametar should be provided');
        }
        const ret = await newProd.show(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const create = async (req, res) => {
    try {
        const shcema = joi_1.default.object({
            name: joi_1.default.string().required(),
            price: joi_1.default.number().integer().required(),
            category: joi_1.default.string().required(),
        });
        await shcema.validateAsync(req.body);
        const ret = await newProd.create(req.body);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const update = async (req, res) => {
    try {
        const shcema = joi_1.default.object({
            id: joi_1.default.number().required(),
            name: joi_1.default.string().required(),
            price: joi_1.default.number().integer().required(),
            category: joi_1.default.string().required(),
        });
        await shcema.validateAsync(req.body);
        const ret = await newProd.update(req.body);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const deleteProd = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('id Parametar should be provided');
        }
        const ret = await newProd.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const topFive = async (req, res) => {
    try {
        const ret = await newProd.top5Prod();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const prodByCat = async (req, res) => {
    try {
        if (!req.params.cat) {
            throw new Error('cat(for category) Parametar should be provided');
        }
        const ret = await newProd.prodByCat(req.params.cat);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
exports.default = prodRounter;
