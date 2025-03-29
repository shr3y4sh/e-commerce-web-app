import { useReducer } from 'react';

import { ProductContext, ProductDispatchContext } from './context';

export function ProductsProvider({ children }) {
	const [products, dispatch] = useReducer(productsReducer, []);

	return (
		<ProductContext.Provider value={products}>
			<ProductDispatchContext.Provider value={dispatch}>
				{children}
			</ProductDispatchContext.Provider>
		</ProductContext.Provider>
	);
}

function productsReducer(products, action) {
	switch (action.type) {
		case 'get products':
			return products;
		case 'add product':
			return [...products, action.product];
		case 'delete product':
			return products.filter((product) => product.id !== action.id);

		case 'edit product':
			return products.map((product) => {
				if (product.id === action.id) {
					const updatedProduct = {
						...action.product
					};
					return updatedProduct;
				}
				return product;
			});
		default:
			throw new Error('Unknown action: ' + action.type);
	}
}
