export const errorHandle = (error, req, res, next) => {
	if (error.name === 'MongoServerError' && error.code === 11000) {
		return res.status(400).json({
			message: 'email already exists'
		});
	}

	res.status(500).json({
		error
	});
};

export const unknownEndpoint = (req, res) => {
	res.status(404).json({
		message: 'Unknown endpoint'
	});
};
