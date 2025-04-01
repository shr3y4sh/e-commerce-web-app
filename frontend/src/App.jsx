import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { getAllProducts } from './api/products';
import { addUser, authorize } from './api/users';
import HeaderLayout from './header/layout';
import NavBar from './header/nav-bar';
import ProductsPage from './products/products-page';
import SignUpForm from './forms/signup/sign-up';
import Login from './forms/login/login';
import UserProfile from './profile/profile';

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<Home />
			</QueryClientProvider>
		</Router>
	);
}

export function Home() {
	const [currentRoute, setCurrentRoute] = useState('home');

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(() => {
		const savedToken = localStorage.getItem('token');
		return savedToken ? savedToken : null;
	});
	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (token) {
					await authorize(token);
					setUser({ username: 'john' });
				}
			} catch (error) {
				console.error('Authentication failed', error);
				setToken(null);
				setUser(null);
			}
		};

		checkAuth();
	}, [token]);

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
					// login={logged.isLog}
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

				<Route path='/api/login'>
					<Login
						setCurrentRoute={setCurrentRoute}
						setToken={setToken}
					/>
				</Route>

				<Route path='/api/signup'>
					<SignUpForm mutation={signupMutation} />
				</Route>

				{currentRoute === 'profile' && (
					<UserProfile username={user.username} email={user.email} />
				)}
			</main>
		</>
	);
}

function Hero() {
	return (
		<div className='hero-content'>
			<h1>Find everything you want</h1>
			<p>Discover the latest tech-gadgets at unbeatable prices.</p>
			<button className='btn'>Shop Now</button>
		</div>
	);
}

export default App;
