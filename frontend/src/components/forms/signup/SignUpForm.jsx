import '../forms.css';

export default function SignUpForm({ mutation }) {
	function handleSignUp(formData) {
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');
		const confirmpassword = formData.get('confirm-password');

		if (password !== confirmpassword) {
			alert('Passwords do not match');
			return;
		}

		if (password.length < 5) {
			alert('Password must be at least 5 characters');
			return;
		}

		const user = {
			username,
			email,
			password,
			confirmpassword
		};

		mutation.mutate(user);
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
					<button className='submit-button' type='submit'>
						Sign Up
					</button>
				</div>
			</form>

			<div className='notification'>
				{mutation.isError && (
					<p className='error'>Error: {mutation.error.message}</p>
				)}
				{mutation.isPending && <p>Pending...</p>}

				{mutation.isSuccess && (
					<p className='success'>User created successfully</p>
				)}
			</div>
		</>
	);
}
