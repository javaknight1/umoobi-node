import express from 'express';

import { getAllFilms, newFilm, updateFilm } from '../controllers/films';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/films', isAuthenticated, newFilm);
    router.put('/films', isAuthenticated, updateFilm);
    router.get('/films', getAllFilms);
    router.get('/films/:id', getAllFilms);
};