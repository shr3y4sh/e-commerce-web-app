export default function Login() {
	function handleLogin(formData) {
		const email = formData.get('email');
		const password = formData.get('password');
	}

	return (
		<>
			<form action={handleLogin}>
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
