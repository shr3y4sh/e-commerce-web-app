import Product from '../models/products.js';
import User from '../models/user.js';
// import  from '-html';

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json(products);
};

const getOneProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	res.status(200).json(product);
};

const createProduct = async (req, res) => {
	const { title, price, description, category, image } = req.body;
	const user = await User.findById(req.user.id);

	const product = new Product({
		title,
		price,
		description,
		category,
		image,
		user: user.id
	});
	await product.save();
	res.status(201).json(product);
};

const editProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	if (product.user.toString() !== req.user.id) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { title, price, description, category, image } = req.body;
	product.title = title;
	product.price = price;
	product.description = description;
	product.category = category;
	product.image = image;

	await product.save();
	res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}
	const user = await User.findById(req.user.id);

	if (product.user.toString() !== user.id) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	await product.deleteOne();
	res.status(200).json({ message: 'Product deleted' });
};

export default {
	getAllProducts,
	getOneProduct,
	createProduct,
	editProduct,
	deleteProduct
};
