import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import connnectDB from './config/db.js';

import { errorHandle, unknownEndpoint } from './middleware/error-handle.js';

import userRouter from './routes/protected/users.js';
import productRouter from './routes/product-routes.js';
import productAuthRouter from './routes/protected/products.js';
import authRouter from './routes/protected/auth-routes.js';

//
import secretRouter from './routes/secret-route.js';
//
dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/protected/users', userRouter);
app.use('/api/protected/products', productAuthRouter);
app.use('/api/products', productRouter);
app.use('/api', authRouter);

app.use('/api/secret', secretRouter);

app.use(unknownEndpoint);
app.use(errorHandle);

await connnectDB();

export default app;
