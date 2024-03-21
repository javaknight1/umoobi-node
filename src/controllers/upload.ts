import express from 'express';
import fs from 'fs/promises';

export const uploadFilm = async (req: express.Request, res: express.Response) => {
    // TODO: Implement this function
    // req.file is the file
    // req.body will hold the text fields, if there were any
    console.log(req.body);
    const oldPath = __dirname + '/uploads/' + req.file.filename
    const newPath = __dirname + '/uploads/' + 'film_' + req.body.user.id + '.' + Math.round(Date.now() / 1000);

    await fs.rename(oldPath, newPath);

    return res.status(200).end();
};

export const uploadTrailer = async (req: express.Request, res: express.Response) => {
    // TODO: Implement this function
};

export const uploadCover = async (req: express.Request, res: express.Response) => {
    // TODO: Implement this function
};