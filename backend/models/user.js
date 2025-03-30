import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: String,
		email: {
			type: String,
			required: true,
			unique: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		cart: [
			{
				items: [
					{
						product: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'product'
						},
						quantity: {
							type: Number,
							default: 0
						}
					}
				],
				totalPrice: {
					type: Number,
					default: 0.0
				}
			}
		],
		ordersHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'order'
			}
		]
	},
	{ timestamps: true }
);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	}
});

export default mongoose.model('user', userSchema);
