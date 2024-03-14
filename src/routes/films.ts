import express from 'express';

import { deleteFilm, getAllFilms, newFilm, searchFilms, updateFilm } from '../controllers/films';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/film', isAuthenticated, getAllFilms);
    router.get('/film/:id', isAuthenticated, getAllFilms);
    router.post('/film', isAuthenticated, newFilm);
    router.put('/film/:id', isAuthenticated, updateFilm);
    router.delete('/film/:id', isAuthenticated, deleteFilm);

    router.get('/films/search', searchFilms);
};