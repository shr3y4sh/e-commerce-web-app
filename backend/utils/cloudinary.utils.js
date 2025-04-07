import { v2 as cloudinary } from 'cloudinary';

import 'dotenv/config';

const cloud = process.env.CLOUDINARY_NAME;
const apiPublic = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET_KEY;

cloudinary.config({
	cloud_name: cloud,
	api_key: apiPublic,
	api_secret: apiSecret
});

export default cloudinary;
