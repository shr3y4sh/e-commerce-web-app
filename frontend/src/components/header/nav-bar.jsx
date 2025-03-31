import { NavLink } from 'react-router';

import './header.css';

export default function NavBar({ login }) {
	return (
		<>
			<div className='nav-bar'>
				<div className='nav-bar-item'>
					<NavLink to='/'>Home</NavLink>
				</div>
				<div className='nav-bar-item'>
					<NavLink to='/products'>Products</NavLink>
				</div>

				<div className='nav-bar-item'>
					<NavLink to='/login'>Login</NavLink>
				</div>
				<div className='nav-bar-item'>
					<NavLink to='/signup'>Signup</NavLink>
				</div>
			</div>
			<div className='nav-bar'>
				<div className='nav-bar-item'>
					<NavLink to='/profile'>Profile</NavLink>
				</div>
			</div>
		</>
	);
}
