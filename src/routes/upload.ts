import express from 'express';

import { uploadS3 } from 'middlewares/aws-s3';
import { uploadFilm, uploadTrailer, uploadCover } from '../controllers/upload';

export default (router: express.Router) => {
    router.post('/upload/film', uploadS3.single("film"), uploadFilm);
    router.post('/upload/trailer', uploadS3.single("film"), uploadTrailer);
    router.post('/upload/cover', uploadS3.single("film"), uploadCover);
};