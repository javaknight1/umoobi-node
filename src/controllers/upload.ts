import { Request, Response } from 'express';
import fs from 'fs/promises';

export const uploadFilm = async (req: Request, res: Response) => {
    return res.status(200).end();
};

export const uploadTrailer = async (req: Request, res: Response) => {
    return res.status(200).end();
};

export const uploadCover = async (req: Request, res: Response) => {
    return res.status(200).end();
};