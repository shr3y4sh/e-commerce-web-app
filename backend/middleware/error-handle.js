export const requestLogger = (req, res, next) => {
	console.log('Method:', req.method);
	console.log('Path:  ', req.path);
	console.log('Body:  ', req.body);
	console.log('---');
	next();
};

export const errorHandle = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	if (
		error.name === 'MongoServerError' &&
		error.message.includes('E11000 duplicate key error')
	) {
		return res.status(400).json({ error: 'expected `email` to be unique' });
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	}

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}

	next(error);
};

export const unknownEndpoint = (req, res) => {
	res.status(404).json({
		message: 'Unknown endpoint'
	});
};
