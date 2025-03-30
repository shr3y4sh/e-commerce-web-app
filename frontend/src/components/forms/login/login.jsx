import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../../api/users';

import '../forms.css';

export default function Login({ setCurrentRoute, setToken }) {
	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			setToken(data.token);
			localStorage.setItem('token', data.token);

			setCurrentRoute('profile');
		},
		onError: (error) => {
			console.error(error);
		}
	});

	function handleLogin(formData) {
		const email = formData.get('email');
		const password = formData.get('password');

		loginMutation.mutate({ email, password });
	}

	return (
		<>
			<form action={handleLogin} className='form-container'>
				<div className='form_control'>
					<label htmlFor='email'>Email: </label>
					<input type='email' name='email' id='email' />
				</div>
				<div className='form_control'>
					<label htmlFor='password'>Password: </label>
					<input type='password' name='password' id='password' />
				</div>
				<div>
					<button type='submit'>Login</button>
				</div>
			</form>
		</>
	);
}
