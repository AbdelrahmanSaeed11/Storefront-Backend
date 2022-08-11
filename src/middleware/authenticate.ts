import express, {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jwt.verify(token as string, process.env.jwt_token as string);
        next();
    }
    catch (err) {
        res.status(401).json(`Access denied: ${(err as Error).message}`);
    }
}

export default jwtAuth;