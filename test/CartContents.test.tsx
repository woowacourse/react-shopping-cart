import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartContents from '../src/components/features/cart/cartContents/CartContents';
import { resetCartItems } from '../src/mocks/handlers';

describe('CartContents 테스트', () => {
  beforeEach(() => {
    resetCartItems();

    render(
      <BrowserRouter>
        <CartContents />
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
});
