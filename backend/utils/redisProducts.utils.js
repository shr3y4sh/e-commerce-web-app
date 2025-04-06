import redis from './redis.utils.js';

export const getFeaturedRedis = async () => {
	const cachedProducts = await redis.get('featured_products');
	return JSON.parse(cachedProducts);
};

export const setFeaturedRedis = async (products) => {
	await redis.set('featured_products', JSON.stringify(products));
};
