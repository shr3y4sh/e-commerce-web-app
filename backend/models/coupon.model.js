import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true
		},
		discountPercentage: {
			type: Number,
			required: true,
			min: 0,
			max: 100
		},
		expirationDate: {
			type: Date,
			required: true
		},
		isActive: {
			type: Boolean,
			default: true
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{
		timestamps: true
	}
);

couponSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

export default mongoose.model('coupon', couponSchema);
