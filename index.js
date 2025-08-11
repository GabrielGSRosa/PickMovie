import express from 'express';
import mongoose from'mongoose';
import cors from 'cors';
const app = express();
import useRouter from './routers/registerUserRouter.js';
import movies from './routers/registerMovie.js';
import connectToDB from './dbConnection/index.js';

connectToDB()

app.use(cors());
app.use(express.json());

app.use('/', useRouter);
app.use('/', movies);

app.listen(8081, '0.0.0.0', () => {
    console.log("Servidor rodando em http://0.0.0.0:8081");
})