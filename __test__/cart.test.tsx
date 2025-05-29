import { MemoryRouter } from 'react-router';
import App from '../src/pages/CartPage/App';
import { SelectedCartProvider } from '../src/shared/context/SelectedCartProvider';
import { screen, render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach } from 'vitest';

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SelectedCartProvider>
        <App />
      </SelectedCartProvider>
    </MemoryRouter>
  );
}

describe('RTL Test', () => {
  beforeEach(() => {
    renderApp();
  });

  it('장바구니에 상품이 하나도 없을 때 EmptyCartItemUI가 잘 보이는지', () => {
    const cartItemCards = screen.queryAllByTestId('cart-item-card');
    if (cartItemCards.length > 0) return;

    expect(screen.getByText('장바구니에 담은 상품이 없습니다.')).toBeInTheDocument();
  });

  it('장바구니에서 특정 상품의 체크 박스를 눌렀을 때 해당 금액만큼 주문 금액이 업데이트 된다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = screen.getAllByTestId('cart-item-card');
    if (cartItemCards.length === 0) return;

    const firstCartItemInputBox = within(cartItemCards[0]).getByRole('checkbox');

    await user.click(firstCartItemInputBox);

    await waitFor(() => {
      expect(screen.getByText('100,000원')).toBeInTheDocument();
    });
  });
});
