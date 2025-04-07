import Product from '../models/products.model.js';
import cloudinary from '../utils/cloudinary.utils.js';

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

	if (!products) {
		products = await Product.find({ isFeatured: true }).lean();
		await setFeaturedRedis(products);
	}

	if (!products) {
		return res.status(404).json({ message: 'No featured products found' });
	}

	res.status(200).json(products);
};

const createProduct = async (req, res) => {
	const { title, price, description, image, category } = req.body;

	let cloudinaryResponse;

	if (image) {
		cloudinaryResponse = await cloudinary.uploader.upload(image, {
			folder: 'products '
		});
	}

	const product = new Product({
		title,
		price,
		description,
		category,
		image: cloudinaryResponse?.secure_url || ''
	});

	res.status(201).json(product);
};

const deleteProduct = async (req, res) => {
	const id = req.params.id;

	const product = await Product.findByIdAndDelete(id);

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	if (product.image) {
		const publicId = product.image.split('/').pop().split('.')[0];
		await cloudinary.uploader.destroy(`products/${publicId}`);
	}

	res.status(204).json({ message: 'Product deleted' });
};

const getRecommendedProducts = async (req, res) => {
	const products = await Product.aggregate([{ $sample: { size: 3 } }]);

	res.status(200).json(products);
};

const getProductsByCategory = async (req, res) => {
	const category = req.params.category;

	const products = await Product.find({ category });

	if (!products) {
		return res.status(404).json({ message: 'No products found' });
	}

	res.status(200).json(products);
};

const makeProductFeatured = async (req, res) => {
	const id = req.params.id;

	const product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	product.isFeatured = !product.isFeatured;
	await product.save();

	const products = await Product.find({ isFeatured: true });

	await setFeaturedRedis(products);

	res.status(200).json(product);
};

export default {
	getAllProducts,
	getFeaturedProducts,
	createProduct,
	deleteProduct,
	getRecommendedProducts,
	getProductsByCategory,
	makeProductFeatured
};
