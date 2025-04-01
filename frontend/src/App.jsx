import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useLogin } from './contexts/login/login-context';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { LoginProvider } from './contexts/login/login-provider';

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
			<LoginProvider>
				<Home />
			</LoginProvider>
		</QueryClientProvider>
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
function Home() {
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

export default App;
