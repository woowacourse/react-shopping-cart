import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { createMockProduct } from '../cypress/fixtures/defaultProducts';
import { useCart } from '../src/components/ProductItem/hooks/useCart';

export type Product = {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
};

const mockProduct = createMockProduct();

describe('useCart 훅 테스트입니다.', () => {
	test('useCart의 addCart 함수를 테스트한다.', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		expect(result.current.cart).toEqual([]); // 초기값을 넣는다.

		act(() => {
			result.current.addCart(mockProduct);
		});

		const { quantity, product } = result.current.cart[0];

		expect(quantity).toEqual(1);
		expect(product).toEqual(mockProduct);
	});

	test('useCart의 updateCart 함수를 테스트한다. -> 기존에 있던 장바구니 상품의 수량을 5로 변경한다.', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		act(() => {
			result.current.updateCart(5, mockProduct);
		});

		const { quantity, product } = result.current.cart[0];

		expect(quantity).toEqual(5);
		expect(product).toEqual(mockProduct);
	});

	test('useCart의 deleteCart 함수를 테스트한다. -> 기존에 있던 장바구니 상품 하나를 제거한다.', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		act(() => {
			result.current.deleteCart(mockProduct);
		});

		const { cart } = result.current;

		expect(cart).toHaveLength(0);
	});
});
