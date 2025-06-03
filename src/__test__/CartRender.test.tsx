import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';
import App from '../App';

let currentCart = [...cartMockData];

vi.mock('../utils/getBrowserBaseUrl', () => {
  return {
    getBrowserBaseUrl: vi.fn(() => '/'),
  };
});

vi.mock('../api/cart', () => ({
  getShoppingCartData: vi.fn(() => Promise.resolve(currentCart)),
  addCartItem: vi.fn((productId: string) => {
    const foundProduct = productListMockData.find((p) => p.id === productId);
    if (!foundProduct) {
      throw new Error(`${productId} id를 가진 Product가 존재하지 않습니다.`);
    }
    currentCart.push({
      id: String(currentCart.length + 1),
      quantity: 1,
      product: foundProduct,
    });
    return Promise.resolve();
  }),
  deleteCartItem: vi.fn((cartId: string) => {
    currentCart = currentCart.filter((item) => item.id.toString() !== cartId);
    return Promise.resolve();
  }),
  patchCartItem: vi.fn((cartId: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === cartId);
    if (!cartItem) {
      throw new Error(`${cartId} id를 가진 Cart가 존재하지 않습니다.`);
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
}));

vi.mock('../api/baseAPI', () => ({
  baseAPI: vi.fn(() => Promise.resolve(productListMockData)),
}));

const PRODUCT_NAME_1 = '프린세스 미용놀이';
const PRODUCT_NAME_2 = '코카콜라 제로 1.5L';

function expectChecked(button: HTMLElement, checked: boolean) {
  expect(button).toHaveAttribute('aria-checked', checked ? 'true' : 'false');
}

describe('Cart 렌더링 및 초기 상태', () => {
  it('1. 장바구니 데이터를 불러오고 화면에 렌더링한다', async () => {
    render(<App />);
    expect(await screen.findByText(PRODUCT_NAME_1)).toBeInTheDocument();
    expect(screen.getByText(PRODUCT_NAME_2)).toBeInTheDocument();

    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    checkboxes.forEach((cb) => expectChecked(cb, true));

    expect(screen.getByText(/총 결제 금액/)).toBeInTheDocument();
    expect(screen.getByText(/배송비/)).toBeInTheDocument();
  });
});
