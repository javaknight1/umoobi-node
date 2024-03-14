import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', routes());
 
const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Running server on https://localhost:8080/")
});