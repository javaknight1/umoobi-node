import express from 'express';
import jwt from 'jsonwebtoken';

import { getUserByEmail, createUser } from '../db/users';
import { saltPassword, comparePassword, errResponse } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errResponse(res, 400, "MISSING_FIELDS", "You are missing either email or password.");
        }

        const user = await getUserByEmail(email).select("+password");

        if (!user) {
            return errResponse(res, 400, "EMAIL_NOT_FOUND", "Email " + email + " not found.");
        }

        if (comparePassword(password, user.password) === false){
            return errResponse(res, 403, "INCORRECT_PASSWORD", "The given password is incorrect.");
        }

        const token = jwt.sign({id: user._id}, process.env.JWT);
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.cookie("access_token", token, { httpOnly: true })
                    .status(200).json(userWithoutPassword).end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return errResponse(res, 400, "MISSING_FIELDS", "You are missing either username, email, or password.");
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return errResponse(res, 400, "USER_EXISTS", "User with email " + email + " already exists.");
        }

        const user = await createUser({
            email,
            username,
            password: saltPassword(password),
        });

        const token = jwt.sign({id: user._id}, process.env.JWT);
        const { password: _, ...userWithoutPassword } = user;

        res.cookie("access_token", token, { httpOnly: true })
                    .status(200).json(userWithoutPassword).end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
}