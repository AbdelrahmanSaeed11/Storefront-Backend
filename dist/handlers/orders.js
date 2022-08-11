"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const orders_1 = require("../models/orders");
const joi_1 = __importDefault(require("joi"));
const newOrder = new orders_1.Orders();
const orderRouter = (app) => {
    app.get('/api/orders', authenticate_1.default, index);
    app.post('/api/orders', authenticate_1.default, create);
    app.put('/api/orders/status', authenticate_1.default, updateStatus);
    app.get('/api/orders/current/:user_id', authenticate_1.default, currentOrder);
    app.get('/api/orders/completed/:user_id', authenticate_1.default, completedOrders);
    app.post('/api/orders/product', authenticate_1.default, addProduct);
    app.delete('/api/orders/:id', authenticate_1.default, deleteOrder);
};
const index = async (req, res) => {
    try {
        const ret = await newOrder.index();
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const create = async (req, res) => {
    try {
        if (!req.body.user_id) {
            throw new Error('The user_id missing in the request body');
        }
        const ret = await newOrder.create(req.body.user_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const updateStatus = async (req, res) => {
    try {
        if (!req.body.order_id) {
            throw new Error('The order_id missing in the request body');
        }
        const ret = await newOrder.updateStatus(req.body.order_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const currentOrder = async (req, res) => {
    try {
        if (!req.params.user_id) {
            throw new Error('The user_id missing in the url');
        }
        const ret = await newOrder.currOrder(req.params.user_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const completedOrders = async (req, res) => {
    try {
        if (!req.params.user_id) {
            throw new Error('The user_id is missing in the url');
        }
        const ret = await newOrder.completedOrders(req.params.user_id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const addProduct = async (req, res) => {
    try {
        const shcema = joi_1.default.object({
            order_id: joi_1.default.string().required(),
            product_id: joi_1.default.string().required(),
            quantity: joi_1.default.number().required(),
        });
        await shcema.validateAsync(req.body);
        const { order_id, product_id, quantity, } = req.body;
        const ret = await newOrder.addProduct(order_id, product_id, quantity);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
const deleteOrder = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('The id is missing in the url');
        }
        const ret = await newOrder.delete(req.params.id);
        res.json(ret);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
exports.default = orderRouter;
