import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import connnectDB from './config/db.js';

import { errorHandle, unknownEndpoint } from './middleware/error-handle.js';

import userRouter from './routes/user-routes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);

app.use(unknownEndpoint);
app.use(errorHandle);

await connnectDB();

export default app;
