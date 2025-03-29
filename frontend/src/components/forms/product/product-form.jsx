import { useState } from 'react';

export default function ProductCreateForm({ isEditing, details }) {
	const [product, setProduct] = useState(null);

	let oldProduct;

	if (isEditing) {
		oldProduct = { ...details };
	} else {
		oldProduct = product !== null ? { ...product } : null;
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

		setProduct(nextProduct);
	}

	return (
		<form action={handleSubmit}>
			<div className='form_control'>
				<label htmlFor='title'>Title: </label>
				<input
					type='text'
					name='title'
					id='title'
					value={oldProduct?.title}
				/>
			</div>
			<div className='form_control'>
				<label htmlFor='price'>Price: </label>
				<input
					type='number'
					name='price'
					id='price'
					value={oldProduct?.price}
				/>
			</div>
			<div className='form_control'>
				<label htmlFor='description'>Description: </label>
				<textarea name='description' id='description'>
					{oldProduct?.description}
				</textarea>
			</div>
			<div className='form_control'>
				<label htmlFor='image'>Image: </label>
				<input
					type='file'
					name='image'
					id='image'
					value={oldProduct?.image}
				/>
			</div>
			<div>
				<button type='submit'>Create Product</button>
			</div>
		</form>
	);
}
