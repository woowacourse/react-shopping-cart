import { MemoryRouter } from 'react-router';
import App from '../src/pages/CartPage/CartPage';
import { CartItemsProvider } from '../src/shared/context/CartItemsProvider';
import { SelectedCartItemsProvider } from '../src/shared/context/SelectedCartItemsProvider';
import { screen, render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <CartItemsProvider>
        <SelectedCartItemsProvider>
          <App />
        </SelectedCartItemsProvider>
      </CartItemsProvider>
    </MemoryRouter>
  );
}

describe('RTL Test', () => {
  beforeEach(() => {
    renderApp();
  });
  it('장바구니에 상품이 하나도 없을 때 EmptyCartItemUI가 잘 보이는지', async () => {
    const cartItemCards = await screen.findAllByTestId('cart-item-card');
    if (cartItemCards.length !== 0) return;
    const emptyMessage = await screen.findByText('장바구니에 담은 상품이 없습니다.');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('장바구니에서 체크박스를 누르면 배송비를 고려하여 해당 금액이 반영된다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = await screen.findAllByTestId('cart-item-card');
    expect(cartItemCards.length).toBeGreaterThan(0);

    await waitFor(() => {
      const deliveryFeeElement = screen.getByTestId('delivery-fee');
      expect(deliveryFeeElement.textContent).toContain('0원');
    });

    const totalPurchasePrice = screen.getByTestId('total-purchase-price');
    await waitFor(() => {
      expect(totalPurchasePrice.textContent).toContain('228,000원');
    });

    const firstCard = cartItemCards[1];
    const checkbox = within(firstCard).getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      const deliveryFeeAfter = screen.getByTestId('delivery-fee');
      expect(deliveryFeeAfter.textContent).toContain('3,000원');
      expect(totalPurchasePrice.textContent).toContain('31,000원');
    });
  });

  it('장바구니에서 상품을 삭제하면 해당 상품이 화면에서 사라진다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = await screen.findAllByTestId('cart-item-card');

    expect(cartItemCards.length).toBeGreaterThan(0);

    const firstCard = cartItemCards[0];

    const deleteButton = within(firstCard).getByRole('button', {
      name: '삭제',
    });

    await user.click(deleteButton);

    const updatedCartItemCards = await screen.queryAllByTestId('cart-item-card');

    await waitFor(() => {
      expect(updatedCartItemCards.length).toBe(cartItemCards.length - 1);
    });
  });

  it('장바구니에서 + 버튼을 누르면 현재 수량보다 1 증가한다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = await screen.findAllByTestId('cart-item-card');
    expect(cartItemCards.length).toBeGreaterThan(0);

    const firstCard = cartItemCards[0];

    const quantityPlusButton = within(firstCard).getByRole('button', {
      name: '+',
    });
    const quantityElement = within(firstCard).getByTestId('card-item-quantity');

    const initialQuantity = parseInt(quantityElement.textContent ?? '1', 10);
    expect(initialQuantity).toBeGreaterThan(0);

    await user.click(quantityPlusButton);

    await waitFor(() => {
      const updatedQuantity = parseInt(quantityElement.textContent ?? '0', 10);
      expect(updatedQuantity).toBe(initialQuantity + 1);
    });
  });
});
