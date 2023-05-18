import { selector } from 'recoil';
import { Product } from '@/@types/product.type';
import { MOCK_API_URL } from '@/constant';

export const fetchProductSelector = selector({
	key: 'FetchProductSelector',
	get: async () => {
		const response = await fetch(MOCK_API_URL);
		if (!response.ok) throw new Error('서버 요청을 실패했습니다.');
		const products = await response.json();
		return products as Product[];
	},
});
