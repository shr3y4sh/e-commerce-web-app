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
		}
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
