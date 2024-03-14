import express from 'express';

import { deleteUserById, getUsers, getUserById, updateUserById } from '../db/users';
import { errResponse } from '../helpers';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;

        if (id) {
            const user = await getUserById(id);

            if (!user) {
                return errResponse(res, 400, "USER_NOT_FOUND", "User does not exist.");
            }

            return res.status(200).json(user).end();
        } else {
            const users = await getUsers();

            return res.status(200).json(users).end();
        }
        
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        await updateUserById(id, req.body);
        
        return res.status(200).json("Updated user successfully!").end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        await deleteUserById(id);

        return res.status(200).json("Successfully deleted user!").end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};