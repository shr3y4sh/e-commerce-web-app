export async function getAllProducts() {
	try {
		const res = await fetch('/api/products', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			const error = new Error(
				'An error occurred while fetching the products.'
			);
			error.code = res.status;
			throw error;
		}

		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function getProductById(id) {
	try {
		const res = await fetch(`/api/products/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			const error = new Error(
				'An error occurred while fetching the product.'
			);
			error.code = res.status;
			throw error;
		}
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}
