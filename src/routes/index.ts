import express from 'express';

import authentication from './auth';
import users from './users';
import films from './films';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    films(router);
    
    return router;
}