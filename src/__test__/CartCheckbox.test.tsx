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

function expectChecked(button: HTMLElement, checked: boolean) {
  expect(button).toHaveAttribute('aria-checked', checked ? 'true' : 'false');
}

describe('Cart 체크박스 선택/해제 기능', () => {
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

  it('1. 상품 선택을 해제하면 결제 금액이 감소한다', async () => {
    render(<App />);
    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    fireEvent.click(checkboxes[0]);

    expectChecked(checkboxes[0], false);
    await waitFor(() => {
      expect(screen.getByText(/총 결제 금액/)).not.toHaveTextContent('3,110원');
    });
  });

  it('2. 전체 선택 버튼을 누르면 모두 해제되고, 주문금액/배송비 0, 주문확인 비활성화', async () => {
    render(<App />);
    const allCheckbox = await screen.findByLabelText('전체 선택 체크박스');
    fireEvent.click(allCheckbox);

    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    checkboxes.forEach((cb) =>
      expect(cb).toHaveAttribute('aria-checked', 'false')
    );

    await waitFor(() => {
      expect(screen.getByText('주문 금액').nextSibling).toHaveTextContent(
        '0원'
      );
      expect(screen.getByLabelText('배송비')).toHaveTextContent('0원');
      expect(screen.getByLabelText('총 결제 금액')).toHaveTextContent('0원');
    });

    const orderConfirmButton = screen.getByLabelText('주문 확인');
    expect(orderConfirmButton).toBeDisabled();
  });

  it('3. 개별 체크 해제하면 전체 선택도 해제된다', async () => {
    render(<App />);
    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    fireEvent.click(checkboxes[0]);
    const allCheckbox = await screen.findByLabelText('전체 선택 체크박스');
    expect(allCheckbox).toHaveAttribute('aria-checked', 'false');
  });

  it('4. 개별 체크 해제 상태에서 전체 선택 버튼 누르면 모두 다시 선택된다', async () => {
    render(<App />);
    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'false');
    const allCheckbox = await screen.findByLabelText('전체 선택 체크박스');
    fireEvent.click(allCheckbox);
    expect(allCheckbox).toHaveAttribute('aria-checked', 'true');
  });

  it('5. "주문하기" 버튼은 선택된 상품이 없으면 비활성화된다', async () => {
    render(<App />);
    const orderConfirmButton = screen.getByLabelText('주문 확인');
    expect(orderConfirmButton).toBeDisabled();

    const checkboxes = await screen.findAllByLabelText('상품 선택 체크박스');
    fireEvent.click(checkboxes[0]);
    expect(orderConfirmButton).toBeEnabled();
  });
});
