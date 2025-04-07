import Coupon from '../models/coupon.model.js';
import { stripe } from '../utils/payments.utils.js';

const createCheckoutSession = async (req, res) => {
	const { products, couponCode } = req.body;

	if (!Array.isArray(products) || products.length === 0) {
		res.status(400).json({ message: 'Invalid products' });
	}

	let totalAmount = 0;

	const lineProducts = products.map((product) => {
		const amount = Number(product.price);
		totalAmount += amount * product.quantity;

		return {
			price_data: {
				currency: 'inr',
				product_data: {
					name: product.name,
					images: [product.image]
				},
				unit_amount: amount
			}
		};
	});

	let coupon = null;

	if (couponCode) {
		coupon = await Coupon.findOne({ code: couponCode, isActive: true });
		if (coupon) {
			totalAmount -= (totalAmount * coupon.discountPercentage) / 100;
		}
	}

	const session = stripe.checkout.session.create({
		line_items: lineProducts,
		mode: 'payment',
		success_url: `${process.env.FRONTEND_URL}/purchase-success/${stripe.checkout.session.id}`,
		cancel_url: `${process.env.FRONTEND_URL}/purchase-cancel`,
		payment_method_type: ['card'],
		discounts: coupon
			? [
					{
						coupon: await createPaymentsCoupon(
							coupon.discountPercentage
						)
					}
			  ]
			: [],
		metadata: {
			userId: req.user.id,
			couponCode: couponCode || ''
		}
	});

	const response = {};

	if (totalAmount >= 20000) {
		const newCoupon = await createNewCoupon(req.user.id);
		response.coupon = newCoupon;
	}

	response.sessionId = session.id;
	response.totalAmount = totalAmount;

	res.status(201).json(response);
};

const checkoutSuccess = async (req, res) => {
	const { sessionId } = req.body;
};

export default {
	createCheckoutSession
};

async function createPaymentsCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: 1
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	const newCoupon = new Coupon({
		code: generateCouponCode(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
		userId: userId
	});

	await newCoupon.save();

	return newCoupon;
}

function generateCouponCode() {
	const code = Math.random().toString(36).substring(9, 15).toUpperCase();
	const prefix = 'COUPON';
	return `${prefix} ${code}`;
}
