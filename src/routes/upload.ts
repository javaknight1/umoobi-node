import express from 'express';
import multer from 'multer';
import { uploadS3 } from 'middlewares/aws-s3';
import { uploadFilm, uploadTrailer, uploadCover } from '../controllers/upload';
import { isAuthenticated } from '../middlewares';

const upload = multer({ dest: './uploads' });

export default (router: express.Router) => {
    router.post('/upload/film', isAuthenticated, upload.single("film"), uploadFilm);
    // router.post('/upload/trailer', uploadS3.single("film"), uploadTrailer);
    // router.post('/upload/cover', uploadS3.single("film"), uploadCover);
};