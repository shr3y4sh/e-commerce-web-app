import app from './app';
import 'dotenv/config';
import { db_connect } from './utils/mongodb';

const port = process.env.PORT || 3000;

db_connect()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
