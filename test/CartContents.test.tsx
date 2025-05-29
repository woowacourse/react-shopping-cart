import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartContents from '../src/components/features/cart/cartContents/CartContents';

describe('CartContents 테스트', () => {
  beforeEach(() => {
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
});
