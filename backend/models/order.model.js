import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'product',
					required: true
				},
				quantity: {
					type: Number,
					required: true,
					min: 1
				},
				price: {
					type: Number,
					required: true,
					min: 0
				}
			}
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0
		},
		paymentSessionId: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('order', orderSchema);
