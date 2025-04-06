import './cards.css';

export default function DisplayCard({ product }) {
	return (
		<div className='product-card'>
			{/* <img src={product.image} alt={product.title} /> */}
			<div className='product-card-info'>
				<h3>{product.title}</h3>
				<p>{product.description}</p>
				<p className='price'>{product.price}</p>
			</div>
			<div className='product-card-actions'>
				<CardButtons />
			</div>
		</div>
	);
}

function CardButtons() {
	return (
		<div className='product-card-buttons'>
			{/* <button className='card-buttons'>Edit</button>
			<button className='card-buttons'>Delete</button> */}
			<button className='card-buttons'>View</button>
			<button className='card-buttons'>Add to Cart</button>
		</div>
	);
}
