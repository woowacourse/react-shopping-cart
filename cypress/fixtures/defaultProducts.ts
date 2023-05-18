import { Product } from '../../src/@types/product.type';

const defaultProducts: Product = {
	id: 1,
	name: '정사각(420ml)',
	price: 43400,
	imageUrl:
		'https://item.kakaocdn.net/do/d0abc6fe74e616536cf07626699bbc707154249a3890514a43687a85e6b6cc82',
};

export const createMockProduct = (overwrites: Partial<Product> = {}) => ({
	...defaultProducts,
	...overwrites,
});
