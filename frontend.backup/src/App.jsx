import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { getAllProducts } from './api/products';
import { addUser } from './api/users';

import HeaderLayout from './components/header/HeaderLayout';
import NavBar from './components/header/NavBar';
import ProductsPage from './components/products/ProductsPage';
import Login from './components/forms/login/Login';
import SignUpForm from './components/forms/signup/SignUpForm';
import UserProfile from './components/profile/UserProfile';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);
}

function Home() {
	const [currentRoute, setCurrentRoute] = useState('home');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		fetch('/api/users/profile', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(async (res) => {
				const data = await res.json();
				setUser(data);
			})
			.catch((err) => console.error(err));
	}, [user]);

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
					login={user !== null}
				/>
			</HeaderLayout>
			<main>
				{currentRoute === 'home' && (
					<section className='hero'>
						<Hero
							setCurrentRoute={() => setCurrentRoute('products')}
						/>
					</section>
				)}
				{currentRoute === 'products' && (
					<ProductsPage initialProducts={productQuery.data} />
				)}

				{currentRoute === 'login' && (
					<Login
						setUser={setUser}
						setCurrentRoute={setCurrentRoute}
					/>
				)}

				{currentRoute === 'signup' && (
					<SignUpForm mutation={signupMutation} />
				)}

				{currentRoute === 'profile' && (
					<UserProfile
						user={user}
						setCurrentRoute={setCurrentRoute}
						setUser={setUser}
					/>
				)}
			</main>
		</>
	);
}

function Hero({ setCurrentRoute }) {
	return (
		<div className='hero-content'>
			<h1>Find everything you want</h1>
			<p>Discover the latest tech-gadgets at unbeatable prices.</p>
			<button className='btn' onClick={setCurrentRoute}>
				Shop Now
			</button>
		</div>
	);
}
export default App;
