import App from '../src/pages/CartPage/App';
import { SelectedCartProvider } from '../src/shared/context/SelectedCartProvider';
import { screen, render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

function renderApp() {
  return render(
    <SelectedCartProvider>
      <App />
    </SelectedCartProvider>
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
});
