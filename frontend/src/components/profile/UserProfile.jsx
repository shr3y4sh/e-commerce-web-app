import './user-profile.css';

function UserProfile({ username, email }) {
	return (
		<div className='profile-container'>
			<h2>User Profile</h2>
			<div className='profile-card'>
				<p>
					<strong>Username:</strong> {username}
				</p>
				<p>
					<strong>Email:</strong> {email}
				</p>
			</div>
		</div>
	);
}

export default UserProfile;
