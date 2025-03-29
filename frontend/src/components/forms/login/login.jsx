import { useMutation } from '@tanstack/react-query';

import { useLogin } from './login-context';
import { loginUser } from '../../../api/users';

import '../forms.css';

export default function Login({ setUserLogin, setCurrentRoute }) {
	const [logged, setLogged] = useLogin();

	const loginMutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			setLogged({
				...logged,
				token: data.token,
				isLog: true
			});
			setUserLogin({
				username: data.username,
				email: data.email
			});

			setCurrentRoute('profile');
		},
		onError: (error) => {
			console.log(error);
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
