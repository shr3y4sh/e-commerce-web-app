// PACKAGES
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

// MIDDLEWARES
import { requestInfo } from './middlewares/misc.middleware.js';
import connectToDatabase from './utils/mongo.utils.js';

// ROUTES
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import {
	errorHandler,
	unknownEndpoint
} from './middlewares/errorHandle.middleware.js';

const app = express();

////
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(requestInfo);

////
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

////
app.use(unknownEndpoint);
app.use(errorHandler);

connectToDatabase();

export default app;
