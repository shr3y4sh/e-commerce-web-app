import {
	useProductsDispatch,
	useProducts
} from '../../../contexts/products/context';

export default function ProductForm({ isEditing }) {
	const dispatch = useProductsDispatch();

	const productData = useProducts();
	return (
		<>
			{isEditing ? (
				<EditProduct
					productData={productData}
					updateProduct={dispatch}
				/>
			) : (
				<CreateProduct handleSubmit={dispatch} />
			)}
		</>
	);
}

function CreateProduct({ handleSubmit }) {
	return <FormContent setProduct={handleSubmit} />;
}

function EditProduct({ productData, updateProduct }) {
	return (
		<FormContent setProduct={updateProduct} inputDetails={productData} />
	);
}

function FormContent({ setProduct, inputDetails }) {
	const product = inputDetails || null;
	return (
		<form action={(form) => handleSubmit(form, setProduct)}>
			<div className='form_control'>
				<label htmlFor='title'>Title: </label>
				<input
					type='text'
					name='title'
					id='title'
					value={product.title}
				/>
			</div>
			<div className='form_control'>
				<label htmlFor='price'>Price: </label>
				<input
					type='number'
					name='price'
					id='price'
					value={product?.price}
				/>
			</div>
			<div className='form_control'>
				<label htmlFor='description'>Description: </label>
				<textarea name='description' id='description'>
					{product.description}
				</textarea>
			</div>
			<div className='form_control'>
				<label htmlFor='image'>Image: </label>
				<input
					type='file'
					name='image'
					id='image'
					value={product.image}
				/>
			</div>
			<div>
				<button type='submit'>Create Product</button>
			</div>
		</form>
	);
}

function handleSubmit(formData) {
	const title = formData.get('title');
	const price = formData.get('price');
	const description = formData.get('description');
	const image = formData.get('image');

	const nextProduct = {
		title,
		price,
		description,
		image
	};

	return nextProduct;
}
