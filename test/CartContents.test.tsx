import CartPage from '@/pages/cart/CartPage';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { resetCartItems } from '../src/mocks/handlers';

describe('CartContents 테스트', () => {
  beforeEach(() => {
    resetCartItems();

    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    );
  });

  it('CartTitle이 현재 장바구니에 담겨있는 수량으로 나타난다.', async () => {
    const text = await screen.findByText('현재 4종류의 상품이 담겨있습니다.');

    expect(text).toBeInTheDocument();
  });

  it('CartItem을 각각 선택 할 수 있다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const firstItem = cartItems[0];
    const buttons = within(firstItem).getAllByRole('button');
    const checkBoxButton = buttons[0];

    fireEvent.click(checkBoxButton);

    expect(checkBoxButton).toHaveAttribute('aria-checked', 'false');
  });

  it('CartItem의 + 버튼을 누르면 수량이 증가한다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const firstItem = cartItems[0];
    const buttons = within(firstItem).getAllByRole('button');
    const plusButton = buttons[3];

    fireEvent.click(plusButton);
    const quantity = await within(firstItem).findByText('2');

    expect(quantity).toHaveTextContent('2');
  });

  it('CartItem의 - 버튼을 누르면 수량이 감소한다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const secondItem = cartItems[1];
    const buttons = within(secondItem).getAllByRole('button');
    const minusButton = buttons[2];

    fireEvent.click(minusButton);
    const quantity = await within(secondItem).findByText('1');

    expect(quantity).toHaveTextContent('1');
  });

  it('상품 수량이 1개인 CartItem의 - 버튼을 누르면 상품이 삭제된다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const firstItem = cartItems[0];
    const buttons = within(firstItem).getAllByRole('button');
    const minusButton = buttons[2];

    fireEvent.click(minusButton);

    await waitFor(async () => {
      const updatedCartItems = await screen.findAllByTestId(/CartItem/);
      expect(updatedCartItems.length).toBe(3);
    });
  });

  it('CartItem의 삭제 버튼을 누르면 상품이 삭제된다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const firstItem = cartItems[0];
    const buttons = within(firstItem).getAllByRole('button');
    const deleteButton = buttons[1];

    fireEvent.click(deleteButton);

    await waitFor(async () => {
      const updatedCartItems = await screen.findAllByTestId(/CartItem/);
      expect(updatedCartItems.length).toBe(3);
    });
  });

  it('전체 선택 버튼을 누르면 모든 상품의 선택이 해제된다.', async () => {
    const buttons = await screen.findAllByRole('button');
    const allSelectButton = buttons[0];

    fireEvent.click(allSelectButton);

    const cartItems = await screen.findAllByTestId(/CartItem/);
    cartItems.forEach((item) => {
      const buttons = within(item).getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('선택된 상품의 가격이 10만원 이상이면 배송비가 0원이다.', async () => {
    const priceRows = await screen.findAllByTestId('price-row');
    const deliveryFee = priceRows[1];
    expect(deliveryFee).toHaveTextContent('0원');
  });

  it('선택된 상품의 가격이 10만원 미만이면 배송비가 3,000원이다.', async () => {
    const cartItems = await screen.findAllByTestId(/CartItem/);
    const firstItem = cartItems[0];
    const buttons = within(firstItem).getAllByRole('button');
    const checkBoxButton = buttons[0];

    fireEvent.click(checkBoxButton);

    const priceRows = await screen.findAllByTestId('price-row');
    const deliveryFee = priceRows[1];

    expect(deliveryFee).toHaveTextContent('3,000원');
  });

  it('선택된 상품이 없을 때 하단 주문 확인 버튼이 비활성화된다.', async () => {
    const buttons = await screen.findAllByRole('button');
    const allSelectButton = buttons[0];

    fireEvent.click(allSelectButton);

    const orderCheckButton = buttons[buttons.length - 1];

    expect(orderCheckButton).toBeDisabled();
  });
});
