import Coupon from '../models/coupon.model.js';

const getCoupon = async (req, res) => {
	const userId = req.user.id;

	const coupon = await Coupon.findOne({ userId: userId });

	res.status(200).json(coupon || null);
};

const validateCoupon = async (req, res) => {
	const { code } = req.body;
	const userId = req.user.id;

	const coupon = await Coupon.findOne({
		code: code,
		userId: userId,
		isActive: true
	});

	if (!coupon) {
		res.status(404).json({ message: 'Coupon not found' });
	}

	if (coupon.expirationDate < new Date()) {
		res.status(400).json({ message: 'Coupon expired' });
	}

	res.status(200).json({
		discountPercentage: coupon.discountPercentage,
		code: coupon.code
	});
};

export default {
	getCoupon,
	validateCoupon
};
