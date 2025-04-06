import { loggerError } from '../utils/logger.utils.js';

export const unknownEndpoint = (req, res) => {
	res.status(404).json({ error: 'Unknown Endpoint' });
};

export const errorHandler = (error, req, res, next) => {
	loggerError(error);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === 'MongoServerError') {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	}

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}

	return res.status(500).json({ ...error });
};
