// PACKAGES
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// MIDDLEWARES
import { requestInfo } from './middlewares/zod-parse';

// ROUTES
import authRoutes from './routes/auth.routes';

const app = express();

////
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestInfo);

////
app.get('/ping', (_req, res) => {
	res.status(200).send('pong');
});

app.use('/api/auth', authRoutes);

export default app;
