import { loginUser } from '../../../api/users';
import '../forms.css';

export default function Login({ setCurrentRoute, setUser }) {
	async function handleLogin(formData) {
		const email = formData.get('email');
		const password = formData.get('password');
		const data = await loginUser({ email, password });
		const token = data.token;
		const user = {
			username: data.username,
			email: data.email
		};
		localStorage.setItem('token', token);
		setUser(user);
		setCurrentRoute('home');
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
