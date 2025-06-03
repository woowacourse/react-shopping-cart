import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

describe('Cart → 주문 확인 페이지 이동', () => {
  it('1. "주문하기" 버튼을 누르면 주문 확인 페이지로 이동하고, 주문 정보가 올바르게 표시된다', async () => {
    render(<App />);
    await screen.findByText(PRODUCT_NAME_1);

    const orderConfirmButton = screen.getByLabelText('주문 확인');
    expect(orderConfirmButton).not.toBeDisabled();

    fireEvent.click(orderConfirmButton);

    await waitFor(() => {
      expect(screen.getByText('주문 확인')).toBeInTheDocument();

      expect(
        screen.getByText(/총\s*2\s*종류의 상품\s*2\s*개를 주문합니다\./)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/최종 결제 금액을 확인해 확인해 주세요\./)
      ).toBeInTheDocument();

      expect(screen.getByText('총 결제 금액')).toBeInTheDocument();

      const totalPrice = 10000 + 2100 + 3000;
      const totalPriceText = `${totalPrice.toLocaleString()}원`;

      expect(
        screen.getByLabelText(`총 결제 금액은 ${totalPriceText} 입니다.`)
      ).toHaveTextContent(totalPriceText);

      expect(screen.getByText(totalPriceText)).toBeInTheDocument();

      expect(screen.getByRole('button', { name: '결제하기' })).toBeDisabled();
    });
  });
});
