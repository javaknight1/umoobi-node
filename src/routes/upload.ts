import { Router } from 'express';
import multer from 'multer';
import { uploadS3Video, uploadS3Image } from '../helpers/aws-s3';
import { uploadFilm, uploadTrailer, uploadCover } from '../controllers/upload';
import { isAuthenticated } from '../middlewares';

export default (router: Router) => {
    router.post('/upload/film', isAuthenticated, uploadS3Video.single("film"), uploadFilm);
    router.post('/upload/trailer', isAuthenticated, uploadS3Video.single("trailer"), uploadTrailer);
    router.post('/upload/cover', isAuthenticated, uploadS3Image.single("cover"), uploadCover);
};