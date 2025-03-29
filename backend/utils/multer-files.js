import multer from 'multer';

const fileStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, '../data/images');
	},
	filename: (req, file, callback) => {
		callback(null, new Date().toISOString() + '-' + file.originalname);
	}
});

const fileFilter = (req, file, callback) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		callback(null, true);
	} else {
		callback(null, false);
	}
};

export { fileStorage, fileFilter };
