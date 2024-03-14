import express from 'express';
import jwt from 'jsonwebtoken';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "MISSING_FIELDS",
                message: "You are missing either username or email."
            }).end();
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user || !user.authentication) {
            return res.status(400).json({
                status: "EMAIL_NOT_FOUND",
                message: "Email " + email + " not found."
            }).end();
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash) {
            return res.status(403).json({
                status: "INCORRECT_PASSWORD",
                message: "The given password is incorrect."
            }).end();
        }

        // const salt = random();
        // user.authentication.sessionToken = authentication(salt, user._id.toString());
        // await user.save();

        res.cookie("access_token", jwt.sign({id: user._id}, process.env.JWT), { httpOnly: true });

        return res.status(200).json("Successfully logged in!").end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "CODE_ERROR",
            message: "Found message in code."
        }).end();
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({
                status: "MISSING_FIELDS",
                message: "You are missing either username, email, or password."
            }).end();
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                status: "USER_EXISTS",
                message: "User with email " + email + " already exists."
            }).end();
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json("Successfully registered!").end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "CODE_ERROR",
            message: "Found message in code."
        }).end();
    }
}