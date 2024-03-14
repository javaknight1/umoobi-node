import express from 'express';

import { deleteUserById, getUsers, getUserById, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        if ("id" in req.params) {
            const { id } = req.params;
            const user = await getUserById(id);

            if (!id) {
                return res.status(400).json({
                    status: "ID_NOT_FOUND",
                    message: "ID " + id + " does not exist."
                }).end();
            }

            return res.status(200).json(user).end();
        } else {
            const users = await getUsers();

            return res.status(200).json(users).end();
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "CODE_ERROR",
            message: "Found message in code."
        }).end();
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "MISSING_FIELDS",
                message: "ID field is missing."
            }).end();
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(400).json({
                status: "USER_NOT_FOUND",
                message: "User does not exist."
            }).end();
        }

        await updateUserById(id, req.body);
        
        return res.status(200).json("Updated user successfully!").end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "CODE_ERROR",
            message: "Found message in code."
        }).end();
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "ID_NOT_FOUND",
                message: "ID " + id + " does not exist."
            }).end();
        }

        await deleteUserById(id);

        return res.status(200).json("Successfully deleted user!").end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "CODE_ERROR",
            message: "Found message in code."
        }).end();
    }
};