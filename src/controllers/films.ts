import express from 'express';

import { createFilm, deleteFilmById, getFilmById, getFilms, updateFilmById } from '../db/films';
import { errResponse } from '../helpers';

export const getAllFilms = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (id) {   
            const film = await getFilmById(id);

            if (!film) {
                return errResponse(res, 400, "FILM_NOT_FOUND", "Film does not exist.");
            }

            return res.status(200).json(film).end();
        } else {
            const films = await getFilms();

            return res.status(200).json(films).end();
        }
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const newFilm = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, rent, purchase, cover, trailer } = req.body;
        const owner = req.body.user.id;

        if (!title || !description || (!rent && !purchase)) {
            return errResponse(res, 400, "MISSING_FIELDS", "Missing required fields.");
        }

        const film = await createFilm({
            title,
            description,
            rent,
            owner,
            purchase,
            cover,
            trailer
        });

        return res.status(200).json(film).end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const updateFilm = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { title, description, rent, purchase, cover, trailer } = req.body;
        const owner = req.body.user.id;

        if (!id || !title || !description || (!rent && !purchase)) {
            return errResponse(res, 400, "MISSING_FIELDS", "Missing required fields.");
        }

        if (owner !== id) {
            return errResponse(res, 403, "NOT_OWNER", "User is not the owner.");
        }

        const film = await updateFilmById(id, {
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
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};

export const deleteFilm = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const owner = req.body.user.id;

        if (!id) {
            return errResponse(res, 400, "MISSING_FIELDS", "ID field is missing.");
        }

        if (owner !== id) {
            return errResponse(res, 403, "NOT_OWNER", "User is not the owner.");
        }

        const film = await deleteFilmById(id);

        return res.status(200).json(film).end();
    } catch (error) {
        console.log(error);
        return errResponse(res, 400, "CODE_ERROR", "Found message in code.");
    }
};