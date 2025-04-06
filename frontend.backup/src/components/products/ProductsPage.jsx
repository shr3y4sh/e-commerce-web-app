import './product-card/cards.css';
import { ProductsProvider } from '../../contexts/products/products-provider';

import DisplayCard from './product-card/DisplayCard';

export default function ProductsPage({ initialProducts }) {
	const products = initialProducts;

	return (
		<ProductsProvider>
			<div>
				<h1>Available Products</h1>
				<div className='products-container'>
					{products &&
						products.map((product) => (
							<DisplayCard key={product.id} product={product} />
						))}
				</div>
			</div>
		</ProductsProvider>
	);
}
