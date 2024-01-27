import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const MONGO_DB_URL = ""

const app = express();

mongoose.Promise = Promise;
mongoose.connect(MONGO_DB_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Running server on https://localhost:8080/")
});