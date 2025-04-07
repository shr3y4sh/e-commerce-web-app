import Product from '../models/products.model';

const getCart = async (req, res) => {
	const user = req.user;
	const cartItems = user.cartItems.map(async (item) => {
		const product = await Product.findById(item.product);
		return product.toJSON();
	});

	return res.status(200).json({ cartItems });
};

const addToCart = async (req, res) => {
	const productId = req.body.id;
	const user = req.user;

	const product = await user.cartItems.find((item) => item.id === productId);

	if (!product) {
		user.cartItems.push({ product: productId, quantity: 1 });
	} else {
		product.quantity += 1;
	}

	await user.save();
	return res
		.status(201)
		.json({ cartItems: user.cartItems, message: 'Product added to cart' });
};

const removeAllFromCart = async (req, res) => {
	const productId = req.body.id;
	const user = req.user;

	let response;
	if (!productId) {
		user.cartItems = [];
		response = { message: 'All products removed from cart' };
	} else {
		user.cartItems = user.cartItems.filter((item) => item.id !== productId);
		response = {
			cartItems: user.cartItems,
			message: 'Product removed from cart'
		};
	}

	await user.save();
	res.status(200).json(response);
};

const updateQuantity = async (req, res) => {
	const id = req.params.id;
	const quantity = req.body.quantity;
	const user = req.user;

	const product = user.cartItems.find((item) => item.id === id);

	if (!product) {
		return res.status(404).json({ message: 'Product not found in cart' });
	}

	product.quantity = quantity;

	if (quantity === 0) {
		user.cartItems = user.cartItems.filter((item) => item.id !== id);
	}

	await user.save();

	return res.status(200).json({
		cartItems: user.cartItems,
		message: 'Quantity updated'
	});
};

export default {
	getCart,
	addToCart,
	removeAllFromCart,
	updateQuantity
};
