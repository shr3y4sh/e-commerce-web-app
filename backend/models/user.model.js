import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			minlength: 6
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		},
		role: {
			type: String,
			enum: ['customer', 'admin'],
			default: 'customer'
		},
		cartItems: [
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
		]
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	}
});

const User = mongoose.model('user', userSchema);

export default User;
