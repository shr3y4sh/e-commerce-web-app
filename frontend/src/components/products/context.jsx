import { createContext, useContext } from 'react';

export const ProductContext = createContext(null);
export const ProductDispatchContext = createContext(null);

export function useProducts() {
	return useContext(ProductContext);
}
export function useProductsDispatch() {
	return useContext(ProductDispatchContext);
}
