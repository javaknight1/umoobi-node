import express from 'express';

import { getAllFilms, getFilmFromId } from '../controllers/films';

export default (router: express.Router) => {
    router.get('/films', getAllFilms);
    router.get('/films/:id', getFilmFromId);
};