import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},
		description: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		isFeatured: {
			type: Boolean,
			default: false
		},
		image: {
			type: String
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

const Product = mongoose.model('product', productSchema);

export default Product;
