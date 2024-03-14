import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, getAllUsers);
    router.put('/users/:id', isAuthenticated, updateUser);
    router.delete('/users/:id', isAuthenticated, deleteUser);
};