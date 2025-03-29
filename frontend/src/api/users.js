const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function loginQuery(queryParams) {
	const res = await fetch(`${baseUrl}users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(queryParams)
	});

	return await res.json();
}

export async function signupQuery(queryParams) {
	const res = await fetch(`${baseUrl}users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(queryParams)
	});

	return await res.json();
}
