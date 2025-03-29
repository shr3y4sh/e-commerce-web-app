const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function login(queryParams) {
	const res = await fetch(`${baseUrl}users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(queryParams)
	});

	return await res.json();
}

export async function signup(queryParams) {
	const res = await fetch(`${baseUrl}users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(queryParams)
	});

	return await res.json();
}
