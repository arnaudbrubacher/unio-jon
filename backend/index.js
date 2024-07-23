import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = 3102

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})


export default app;
