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
        next();
    });
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const sessionToken = req.cookies.access_token;
    const { id } = req.params;

    if (!id) {
        return next(errResponse(res, 400, "MISSING_FIELDS", "ID field is missing."));
    }

    if (!sessionToken) {
        return next(errResponse(res, 403, "NOT_AUTHENTICATED", "User is not authenticated."));
    }

    jwt.verify(sessionToken, process.env.JWT, (err: any, user: any) => {
        if (err) {
            return next(errResponse(res, 403, "INVALID_TOKEN", "Token is invalid."));
        }
        if (id !== user.id) {
            return next(errResponse(res, 403, "NOT_OWNER", "User is not the owner."));
        }
        next();
    });
}