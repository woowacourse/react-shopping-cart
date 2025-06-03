import { vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { cartMockData } from '../__mocks__/cartData';
import { productListMockData } from '../__mocks__/productListMockData';

let currentCart = [...cartMockData];

vi.mock('../utils/getBrowserBaseUrl', () => ({
  getBrowserBaseUrl: vi.fn(() => '/'),
}));

vi.mock('../api/cart', () => ({
  getShoppingCartData: vi.fn(() => Promise.resolve(currentCart)),
  patchCartItem: vi.fn((cartId: string, quantity: number) => {
    const cartItem = currentCart.find((item) => item.id === cartId);
    if (!cartItem) {
      throw new Error(`${cartId} id를 가진 Cart가 존재하지 않습니다.`);
    }
    // 일부러 실패 유도(수량이 10일 때)
    if (quantity === 10) {
      throw new Error();
    }
    cartItem.quantity = quantity;
    return Promise.resolve();
  }),
  deleteCartItem: vi.fn(() => {
    throw new Error();
  }),
}));

vi.mock('../api/baseAPI', () => ({
  baseAPI: vi.fn(() => Promise.resolve(productListMockData)),
}));

describe('Cart 예외 처리 테스트', () => {
  beforeEach(() => {
    currentCart = [
      ...cartMockData.map((item) => ({
        ...item,
        product: { ...item.product },
      })),
    ];
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('수량 증가 시 에러가 발생하면 토스트 메시지를 보여준다', async () => {
    render(<App />);

    const plusButton = (await screen.findAllByLabelText('수량 증가'))[0];

    // 수량을 20까지 증가시킴
    for (let i = 1; i < 20; i++) {
      fireEvent.click(plusButton);
    }

    await waitFor(() => {
      expect(
        screen.getByText('장바구니에 추가하는 데 실패했습니다.')
      ).toBeInTheDocument();
    });
  });

  it('수량 감소 시 에러가 발생하면 토스트 메시지를 보여준다', async () => {
    render(<App />);

    currentCart[0].quantity = 11; //현재 수량 11로 설정

    const minusButtons = await screen.findAllByLabelText('수량 감소');
    for (let i = 1; i < 5; i++) {
      fireEvent.click(minusButtons[0]);
    } //수량을 10이하로 감소시킴

    await waitFor(() => {
      expect(
        screen.getByText('장바구니에서 빼는 데 실패했습니다.')
      ).toBeInTheDocument();
    });
  });

  it('삭제 시 에러가 발생하면 토스트 메시지를 보여준다', async () => {
    render(<App />);

    const deleteButtons = await screen.findAllByRole('button', {
      name: /삭제/i,
    });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(
        screen.getByText('장바구니 삭제에 실패했습니다.')
      ).toBeInTheDocument();
    });
  });
});
