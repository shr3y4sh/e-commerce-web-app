import User from '../models/user';
import Order from '../models/order';
import Product from '../models/products';

// GET /api/cart
const getCart = async (req, res) => {
	const user = await User.findById(req.auth.userId);

	const cartitems = user.cart;
	res.status(200).json(cartitems);
};

// POST /api/cart
const addToCart = async (req, res) => {
	const user = await User.findById(req.auth.userId).populate('product');
	const cartItems = user.cart.items;
	const product = await Product.findById(req.body.productId);

	const foundProduct = cartItems.find(
		(item) => item.product.id === product.id
	);

	if (!foundProduct) {
		const newItem = {
			product,
			quantity: 1
		};

		user.cart.items = [...cartItems, newItem];
	} else {
		user.cart.items = cartItems.map((item) => {
			if (item.product.id !== foundProduct.id) {
				return item;
			}

			return {
				...item,
				quantity: item.quantity + 1
			};
		});
	}

	user.cart = {
		...user.cart,
		totalPrice: user.cart.totalPrice + foundProduct.price
	};

	await user.save();

	res.status(201).json(user.cart);
};

// DELETE /api/cart/:id
const deletefromCart = async (req, res) => {
	const user = await User.findById(req.auth.userId).populate('product');
	const cartItems = user.cart.items;
	const product = await Product.findById(req.params.id);

	const foundProduct = cartItems.find(
		(item) => item.product.id === product.id
	);

	if (!foundProduct) {
		return res
			.status(400)
			.json({ error: 'Bad request, product not found' });
	}

	user.cart.items = cartItems.filter(
		(item) => item.product.id === foundProduct.id
	);

	user.cart = {
		...user.cart,
		totalPrice: user.cart.totalPrice - foundProduct.price
	};

	await user.save();
	res.status(204).send({ message: 'Deleted from cart' });
};

// POST /api/cart/chekout
const checkout = async (req, res) => {
	const user = await User.findById(req.auth.userId);

	user.cart = [];
};

export default {
	getCart,
	addToCart,
	deletefromCart,
	checkout
};
