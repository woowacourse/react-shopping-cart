import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { rest } from 'msw';
import fetchMock from 'jest-fetch-mock';
import { createMockProduct } from '../cypress/fixtures/defaultProducts';
import { useCart } from '@/components/ProductItem/hooks/useCart';

const mockProduct = createMockProduct();

// MSW 서버를 생성하고 요청 핸들러를 정의합니다.
const server = setupServer(
	rest.post('/cart-Items', (req, res, ctx) => {
		return res(ctx.status(200));
	})
);

beforeAll(() => {
	server.listen();
	fetchMock.enableMocks();
});

afterAll(() => {
	server.close();
	fetchMock.disableMocks();
});

// 테스트 코드
describe('useCart', () => {
	it('장바구니에 상품 하나를 추가한다.', async () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		expect(result.current.cart).toEqual([]);

		server.use(
			rest.post('/cart-Items', (req, res, ctx) => {
				return res(ctx.status(200));
			})
		);

		await waitFor(() => {
			result.current.addCart(mockProduct);
		});

		const { quantity, product } = result.current.cart[0];

		expect(quantity).toEqual(1);
		expect(product).toEqual(mockProduct);
	});

	it('기존에 있던 장바구니 상품의 수량을 변경한다.', async () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		await waitFor(() => {
			result.current.updateCart(5, mockProduct);
		});

		const { quantity, product } = result.current.cart[0];

		expect(quantity).toEqual(5);
		expect(product).toEqual(mockProduct);
	});

	test('기존에 있던 장바구니 상품 하나를 제거한다.', async () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: RecoilRoot,
		});

		await waitFor(() => {
			result.current.deleteCart(mockProduct);
		});

		const { cart } = result.current;

		expect(cart).toHaveLength(0);
	});
});
