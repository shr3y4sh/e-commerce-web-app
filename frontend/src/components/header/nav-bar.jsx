import './header.css';

export default function NavBar({ highlight, togglePage, login }) {
	return (
		<>
			<div className='nav-bar'>
				<div className='nav-bar-item'>
					<button
						className={highlight === 'home' ? 'active' : ''}
						onClick={() => {
							togglePage('home');
						}}>
						Home
					</button>{' '}
				</div>
				<div className='nav-bar-item'>
					<button
						className={highlight === 'products' ? 'active' : ''}
						onClick={() => {
							togglePage('products');
						}}>
						Products
					</button>{' '}
				</div>
				{login && (
					<>
						<div className='nav-bar-item'>
							<button
								className={highlight === 'cart' ? 'active' : ''}
								onClick={() => {
									togglePage('cart');
								}}>
								Cart
							</button>
						</div>
						<div className='nav-bar-item'>
							<button
								className={
									highlight === 'orders' ? 'active' : ''
								}
								onClick={() => {
									togglePage('orders');
								}}>
								Orders
							</button>
						</div>
					</>
				)}
			</div>
			<div className='nav-bar'>
				{!login && (
					<>
						{' '}
						<div>
							<button
								className={
									highlight === 'login' ? 'active' : ''
								}
								onClick={() => {
									togglePage('login');
								}}>
								Login
							</button>
						</div>
						<div className='nav-bar-item'>
							<button
								className={
									highlight === 'signup' ? 'active' : ''
								}
								onClick={() => togglePage('signup')}>
								Sign Up
							</button>
						</div>
					</>
				)}
				{login && (
					<div className='nav-bar-item'>
						<button
							className={highlight === 'profile' ? 'active' : ''}
							onClick={() => togglePage('profile')}>
							Profile
						</button>
					</div>
				)}
			</div>
		</>
	);
}
