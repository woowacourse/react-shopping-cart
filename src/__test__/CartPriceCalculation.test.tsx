import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';
import App from '../App';

let currentCart = [...cartMockData];

jest.mock('../utils/getBrowserBaseUrl', () => {
  return {
    getBrowserBaseUrl: jest.fn(() => '/'),
  };
});

jest.mock('../api/cart', () => ({
  getShoppingCartData: jest.fn(() => Promise.resolve(currentCart)),
  addCartItem: jest.fn((productId: string) => {
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
  deleteCartItem: jest.fn((cartId: string) => {
    currentCart = currentCart.filter((item) => item.id.toString() !== cartId);
    return Promise.resolve();
  }),
  patchCartItem: jest.fn((cartId: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === cartId);
    if (!cartItem) {
      throw new Error(`${cartId} id를 가진 Cart가 존재하지 않습니다.`);
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
}));

jest.mock('../api/baseAPI', () => ({
  baseAPI: jest.fn(() => Promise.resolve(productListMockData)),
}));

describe('Cart 수량 및 금액 계산', () => {
  beforeEach(() => {
    currentCart = [
      ...cartMockData.map((item) => ({
        ...item,
        product: { ...item.product },
      })),
    ];
  });

  afterEach(() => {
    currentCart = [...cartMockData];
    jest.resetModules();
  });

  it('1. 총 금액이 10만원 이상이면 배송비가 무료가 된다', async () => {
    render(<App />);
    const plusButton = (await screen.findAllByLabelText('수량 증가'))[0];
    for (let i = 1; i < 10; i++) {
      fireEvent.click(plusButton);
    }

    await waitFor(() => {
      const shippingLabel = screen.getByLabelText('배송비');
      expect(shippingLabel).toHaveTextContent('0원');
    });
  });

  it('2. 총 금액이 10만원 미만이면 배송비가 3,000원이다', async () => {
    render(<App />);

    await waitFor(() => {
      const shippingLabel = screen.getByLabelText('배송비');
      expect(shippingLabel).toHaveTextContent('3,000원');
    });
  });

  it('3. 상품 수량을 증가시키면 금액이 반영된다', async () => {
    render(<App />);
    const plusButton = (await screen.findAllByLabelText('수량 증가'))[0];
    fireEvent.click(plusButton);

    await waitFor(() => {
      expect(screen.getByText(/총 결제 금액/)).not.toHaveTextContent('3,110원');
    });
  });
});
