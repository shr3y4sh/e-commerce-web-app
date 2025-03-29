import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useLogin } from '../forms/login/login-context';
import { getAllProducts } from '../../api/products';
import { addUser } from '../../api/users';
import HeaderLayout from '../header/layout';
import NavBar from '../header/nav-bar';
import Hero from '../home/hero';
import ProductsPage from '../products/products-page';
import SignUpForm from '../forms/signup/sign-up';
import Login from '../forms/login/login';
import UserProfile from '../profile/profile';

export default function Home() {
	const [currentRoute, setCurrentRoute] = useState('home');
	const [logged, _] = useLogin();

	const [user, setuser] = useState(null);

	const productQuery = useQuery({
		queryKey: ['products'],
		queryFn: getAllProducts
	});

	const signupMutation = useMutation({
		mutationFn: addUser
	});

	return (
		<>
			<HeaderLayout>
				<NavBar
					highlight={currentRoute}
					togglePage={(newRoute) => setCurrentRoute(newRoute)}
					login={logged.isLog}
				/>
			</HeaderLayout>
			<main>
				{currentRoute === 'home' && (
					<section className='hero'>
						<Hero />
					</section>
				)}
				{currentRoute === 'products' && (
					<ProductsPage initialProducts={productQuery.data} />
				)}

				{currentRoute === 'login' && (
					<Login
						setUserLogin={setuser}
						setCurrentRoute={setCurrentRoute}
					/>
				)}

				{currentRoute === 'signup' && (
					<SignUpForm mutation={signupMutation} />
				)}

				{currentRoute === 'profile' && (
					<UserProfile username={user.username} email={user.email} />
				)}
			</main>
		</>
	);
}
