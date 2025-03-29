import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 3
		},
		price: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true,
			minlength: 8
		},
		category: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

productSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

export default mongoose.model('product', productSchema);
