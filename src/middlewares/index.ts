import express from 'express';
import { merge, get } from 'lodash';
import jwt from 'jsonwebtoken';

import { errResponse } from '../helpers';

export const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const sessionToken = req.cookies.access_token;

    if (!sessionToken) {
        return next(errResponse(res, 403, "NOT_AUTHENTICATED", "User is not authenticated."));
    }

    jwt.verify(sessionToken, process.env.JWT, (err: any, user: any) => {
        if (err) {
            return next(errResponse(res, 403, "INVALID_TOKEN", "Token is invalid."));
        }
        next();
    });
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id');

        if (!currentUserId) {
            return res.sendStatus(400);
        }

        if (currentUserId !== id) {
            return res.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}