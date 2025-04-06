import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'product'
				},
				quantity: {
					type: Number,
					default: 1
				}
			}
		],
		totalPrice: {
			type: Number,
			default: 0.0,
			required: true
		}
	},
	{ timestamps: true }
);

orderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Order = mongoose.model('order', orderSchema);

export default Order;
