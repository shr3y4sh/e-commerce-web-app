import mongoose from 'mongoose';

import { loggerError, loggerInfo } from './logger.utils.js';
// DATABASE
const database_url = process.env.DATABASE_URL;

const connectToDatabase = async () => {
	try {
		await mongoose.connect(database_url);
		loggerInfo('Connected to database');
	} catch (error) {
		loggerError(error);
	}
};
export default connectToDatabase;
