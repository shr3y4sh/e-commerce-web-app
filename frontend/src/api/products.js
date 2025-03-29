const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function getAllProducts() {
	try {
		const res = await fetch(`${baseUrl}/products/`);
		if (!res.ok) {
			const error = new Error(
				'An error occurred while fetching the products.'
			);
			error.code = res.status;
			throw error;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getProductById(id) {
	try {
		const res = await fetch(`${baseUrl}/products/${id}`);
		if (!res.ok) {
			const error = new Error(
				'An error occurred while fetching the product.'
			);
			error.code = res.status;
			throw error;
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
