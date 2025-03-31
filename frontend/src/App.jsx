import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, lazy } from 'react';

import { getAllProducts } from './api/products';
import { addUser, authorize } from './api/users';
import HeaderLayout from './components/header/layout';
import NavBar from './components/header/nav-bar';

const ProductsPage = lazy(() => import('./components/products/products-page'));
const SignUpForm = lazy(() => import('./components/forms/signup/sign-up'));
const Login = lazy(() => import('./components/forms/login/login'));

// import UserProfile from './profile/profile';

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Home />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export function Home() {
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
				// login={logged.isLog}
				/>
			</HeaderLayout>
			<main>
				<Routes>
					<Route path='*' element={<Hero />} />
					<Route
						path='/products'
						element={
							<ProductsPage initialProducts={productQuery.data} />
						}
					/>
					<Route
						path='/login'
						element={<Login setToken={setToken} />}
					/>
					<Route
						path='/signup'
						element={<SignUpForm mutation={signupMutation} />}
					/>
					{/* <Route path='/profile' element={<UserProfile username={user.username} email={user.email}/>} /> */}
				</Routes>
			</main>
		</>
	);
}

function Hero() {
	return (
		<div className='hero'>
			<div className='hero-content'>
				<h1>Find everything you want</h1>
				<p>Discover the latest tech-gadgets at unbeatable prices.</p>
				<button className='btn'>Shop Now</button>
			</div>
		</div>
	);
}

export default App;
