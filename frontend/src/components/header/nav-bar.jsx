import './header.css';
import { useContext } from 'react';
import { LoginContext } from '../forms/login/login-context';

export default function NavBar({ highlight, togglePage, login }) {
	const isLoggedIn = useContext(LoginContext);

	return (
		<LoginContext.Provider value={login.current}>
			<div className='nav-bar'>
				<div className='nav-bar-item'>
					<button
						className={highlight === 'home' ? 'active' : ''}
						onClick={(e) => {
							e.stopPropagation();
							togglePage('home');
						}}>
						Home
					</button>
				</div>
				<div className='nav-bar-item'>
					<button
						className={highlight === 'products' ? 'active' : ''}
						onClick={(e) => {
							e.stopPropagation();
							togglePage('products');
						}}>
						Products
					</button>
				</div>
				{isLoggedIn && (
					<>
						<div className='nav-bar-item'>
							<button
								className={highlight === 'cart' ? 'active' : ''}
								onClick={(e) => {
									e.stopPropagation();
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
								onClick={(e) => {
									e.stopPropagation();
									togglePage('orders');
								}}>
								Orders
							</button>
						</div>
					</>
				)}
			</div>
			<div className='nav-bar'>
				{!isLoggedIn && (
					<>
						{' '}
						<div>
							<button
								className={
									highlight === 'login' ? 'active' : ''
								}
								onClick={(e) => {
									e.stopPropagation();
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
				{isLoggedIn && (
					<div className='nav-bar-item'>
						<button
							className={highlight === 'profile' ? 'active' : ''}
							onClick={() => togglePage('profile')}>
							Profile
						</button>
					</div>
				)}
			</div>
		</LoginContext.Provider>
	);
}
