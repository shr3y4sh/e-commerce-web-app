const BASE_URL = '/api';

export async function loginUser(nextUser) {
	const res = await fetch(`${BASE_URL}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(nextUser)
	});

	return await res.json();
}

export async function addUser(nextUser) {
	const res = await fetch(`${BASE_URL}/users/signup`, {
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
