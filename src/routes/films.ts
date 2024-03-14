import express from 'express';

import { deleteFilm, getAllFilms, newFilm, updateFilm } from '../controllers/films';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/films', isAuthenticated, getAllFilms);
    router.get('/films/:id', isAuthenticated, getAllFilms);
    router.post('/films', isAuthenticated, newFilm);
    router.put('/films/:id', isAuthenticated, updateFilm);
    router.delete('/films/:id', isAuthenticated, deleteFilm);

};