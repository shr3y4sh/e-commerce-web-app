import { useState, useEffect } from 'react';
import {
	QueryClientProvider,
	QueryClient,
	useQuery
} from '@tanstack/react-query';

const queryClient = new QueryClient();

import { getAllProducts } from './api/products';

import HeaderLayout from './components/header/layout';
import NavBar from './components/header/nav-bar';

function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [products, setProducts] = useState([]);

	const [currentRoute, setCurrentRoute] = useState('home');

	const productsQuery = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			getAllProducts();
		}
	});

	return (
		<>
			<HeaderLayout>
				<NavBar isLoggedIn={isLoggedIn} />
			</HeaderLayout>
		</>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);
}

export default App;
