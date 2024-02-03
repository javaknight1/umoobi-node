import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

// TODO: Move to env vars
const MONGO_DB_URL = "mongodb+srv://ravery90:ravery90@cluster0.vhq5yur.mongodb.net/?retryWrites=true&w=majority";

const app = express();

mongoose.connect(MONGO_DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use('/', routes());

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