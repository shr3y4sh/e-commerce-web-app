import { useState, useRef } from 'react';
import {
	QueryClientProvider,
	QueryClient,
	useQuery
} from '@tanstack/react-query';
import ProductsPage from './components/products/products-page';

import { getAllProducts } from './api/products';
import HeaderLayout from './components/header/layout';
import NavBar from './components/header/nav-bar';

const queryClient = new QueryClient();

function Home() {
	const login = useRef(false);
	const [currentRoute, setCurrentRoute] = useState('home');

	const productQuery = useQuery({
		queryKey: ['all products'],
		queryFn: getAllProducts
	});

	return (
		<>
			<HeaderLayout>
				<NavBar
					highlight={currentRoute}
					togglePage={(newRoute) => setCurrentRoute(newRoute)}
					login={login}
				/>
			</HeaderLayout>
			<main>
				{currentRoute === 'home' && <h1 className='home'>Home</h1>}
				{currentRoute === 'products' && (
					<ProductsPage initialProducts={productQuery.data} />
				)}
			</main>
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
