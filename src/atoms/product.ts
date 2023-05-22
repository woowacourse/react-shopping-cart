import { selector } from 'recoil';
import { Product } from '@/@types/product.type';
import { MOCK_PRODUCTS_URL } from '@/constant';

export const fetchProductSelector = selector<Product[]>({
	key: 'FetchProductSelector',
	get: async () => {
		const response = await fetch(MOCK_PRODUCTS_URL);
		if (!response.ok) throw new Error('서버 요청을 실패했습니다.');
		const products = await response.json();
		return products;
	},
});
