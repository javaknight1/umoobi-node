import express from 'express';
import { merge, get } from 'lodash';
import jwt from 'jsonwebtoken';
import { errResponse } from '../helpers';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const sessionToken = req.cookies.access_token;

    if (!sessionToken) {
        return next(errResponse(res, 403, "NOT_AUTHENTICATED", "User is not authenticated."));
    }

    jwt.verify(sessionToken, process.env.JWT, (err: any, user: any) => {
        if (err) {
            return next(errResponse(res, 403, "INVALID_TOKEN", "Token is invalid."));
        }
        req.body = merge(req.body, { user: user });
        req.params = merge(req.params, { user: user.id });
        next();
    });
}