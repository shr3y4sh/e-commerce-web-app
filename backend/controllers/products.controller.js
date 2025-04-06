import Product from '../models/products.model.js';

import {
	getFeaturedRedis,
	setFeaturedRedis
} from '../utils/redisProducts.utils.js';

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json(products);
};

const getFeaturedProducts = async (req, res) => {
	let products = await getFeaturedRedis();

	if (products) {
		return res.status(200).json(products);
	}

	products = await Product.find({ isFeatured: true });

	if (!products) {
		return res.status(404).json({ message: 'No featured products found' });
	}

	await setFeaturedRedis(products);

	res.status(200).json(products);
};

export default {
	getAllProducts,
	getFeaturedProducts
};
