import express from 'express';

import { createFilm, getFilmById, getFilms } from '../db/films';

export const getAllFilms = async (_req: express.Request, res: express.Response) => {
    try {
        const films = await getFilms();

        return res.status(200).json(films);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getFilmFromId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const film = await getFilmById(id);

        return res.json(film);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createNewFilm = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, rent, purchase, cover, trailer } = req.body;

        if (!title || !description || (!rent && !purchase)) {
            return res.sendStatus(400);
        }

        const film = await createFilm({
            title,
            description,
            rent,
            purchase,
            cover,
            trailer
        });

        return res.status(200).json(film).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}