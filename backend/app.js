import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import multer from 'multer';
import connnectDB from './config/db.js';

import { fileStorage, fileFilter } from './utils/multer-files.js';
import { errorHandle, unknownEndpoint } from './middleware/error-handle.js';

import userRouter from './routes/user-routes.js';
import productRouter from './routes/product-routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use(unknownEndpoint);
app.use(errorHandle);

await connnectDB();

export default app;
