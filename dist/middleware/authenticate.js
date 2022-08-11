"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.jwt_token);
        next();
    }
    catch (err) {
        res.status(401).json(`Access denied: ${err.message}`);
    }
};
exports.default = jwtAuth;
