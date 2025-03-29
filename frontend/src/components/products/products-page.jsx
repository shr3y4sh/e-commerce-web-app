import DisplayCard from './product-card/display-card';

export default function ProductsPage({ products }) {
	return (
		<div>
			<h1>Available Products</h1>
			<div className='products-container'>
				{products.map((product) => (
					<DisplayCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
