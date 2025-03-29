export default function SignUpForm() {
	function handleSignUp(formData) {
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');
		const confirmPassword = formData.get('confirm-password');
	}

	return (
		<>
			<form action={handleSignUp} className='form-container'>
				<div className='form_control'>
					<label htmlFor='email'>Email: </label>
					<input type='email' name='email' id='email' />
				</div>

				<div className='form_control'>
					<label htmlFor='username'>Username: </label>
					<input type='text' name='username' id='username' />
				</div>
				<div className='form_control'>
					<label htmlFor='password'>Password: </label>
					<input type='password' name='password' id='password' />
				</div>
				<div className='form_control'>
					<label htmlFor='confirm-password'>Confirm Password:</label>
					<input
						type='password'
						name='confirm-password'
						id='confirm-password'
					/>
				</div>
				<div>
					<button type='submit'>Sign Up</button>
				</div>
			</form>
		</>
	);
}
