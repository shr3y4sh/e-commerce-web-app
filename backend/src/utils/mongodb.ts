import { connect } from 'mongoose';
import { z } from 'zod';
import 'dotenv/config';

const mongo_url = process.env.DATABASE_URL;

export const db_connect = async () => {
	try {
		const url = z.string().parse(mongo_url);
		await connect(url);
		console.log('Connected to Mongodb');
	} catch (e) {
		if (e instanceof z.ZodError) {
			console.log('Database url parsing error');
		} else {
			console.log('connection error');
		}
	}
};
