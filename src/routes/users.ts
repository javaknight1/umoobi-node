import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { verifyToken, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', verifyToken, getAllUsers);
    router.get('/users/:id', verifyToken, getAllUsers);
    router.put('/users/:id', verifyToken, updateUser);
    router.delete('/users/:id', verifyToken, deleteUser);
};