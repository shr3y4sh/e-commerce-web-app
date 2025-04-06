import './user-profile.css';

function UserProfile({ user, setCurrentRoute, setUser }) {
	function handleLogout() {
		localStorage.removeItem('token');
		setUser(null);
		setCurrentRoute('home');
		return;
	}

	return (
		<div className='profile-container'>
			<h2>User Profile</h2>
			<div className='profile-card'>
				<p>
					<strong>Username:</strong> {user.username}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
			<div>
				<button className='btn' onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default UserProfile;
