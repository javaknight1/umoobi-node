import express from 'express';

import authentication from './auth';
import users from './users';
import films from './films';
import upload from './upload';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    films(router);
    upload(router);
    
    return router;
}