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

const PRODUCT_NAME_1 = '프린세스 미용놀이';

describe('Cart 삭제 기능', () => {
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

  it('1. 상품을 삭제하면 장바구니에서 사라진다', async () => {
    render(<App />);
    const deleteButtons = await screen.findAllByRole('button', {
      name: /삭제/i,
    });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(PRODUCT_NAME_1)).not.toBeInTheDocument();
    });
  });
  it('2. 장바구니가 비어 있으면 안내 메시지가 보인다', async () => {
    render(<App />);
    let deleteButtons = await screen.findAllByRole('button', { name: /삭제/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(async () => {
      const items = await screen.findAllByLabelText('상품 선택 체크박스');
      expect(items.length).toBe(1);
    });

    deleteButtons = await screen.findAllByRole('button', { name: /삭제/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.getByText(/장바구니.*없/)).toBeInTheDocument();
    });
  });
});
