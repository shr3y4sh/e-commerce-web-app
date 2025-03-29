import { useState } from 'react';

import './header.css';

export default function NavBar({ isLoggedIn }) {
	return (
		<>
			<div className='nav-bar'>
				<div className='nav-bar-item'>
					<a href='/'>
						<button>Home</button>
					</a>
				</div>
				<div className='nav-bar-item'>
					<a href='/products'>
						<button>Products</button>
					</a>
				</div>
				{isLoggedIn && (
					<>
						<div className='nav-bar-item'>
							<a href='/cart'>
								<button>Cart</button>
							</a>
						</div>
						<div className='nav-bar-item'>
							<a href='/orders'>
								<button>Orders</button>
							</a>
						</div>
					</>
				)}
			</div>
			<div className='nav-bar'>
				{!isLoggedIn && (
					<>
						<div className='nav-bar-item'>
							<a href='/login'>
								<button>Login</button>
							</a>
						</div>
						<div className='nav-bar-item'>
							<a href='/signup'>
								<button>Sign Up</button>
							</a>
						</div>
					</>
				)}
				{isLoggedIn && (
					<div className='nav-bar-item'>
						<a href='/profile'>
							<button>Profile</button>
						</a>
					</div>
				)}
			</div>
		</>
	);
}
