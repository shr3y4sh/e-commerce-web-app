export async function loginUser(nextUser) {
	const res = await fetch(`/api/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(nextUser)
	});

	return await res.json();
}

export async function authorize(token) {
	await fetch('/api/protected', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

export async function handleTokenRefresh(token) {
	const res = await fetch('/api/refresh-token', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return await res.json();
}

export async function addUser(nextUser) {
	const res = await fetch(`/api/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(nextUser)
	});

	return await res.json();
}

/* 
{
		"username": "kevin_harris",
		"email": "kevin.harris@example.com",
		"password": "Kev#inPass",
		"isAdmin": true
	}
*/
