import { MemoryRouter } from 'react-router';
import CartPage from '../src/pages/CartPage/CartPage';
import { SelectedCartProvider } from '../src/shared/context/SelectedCartProvider';
import { screen, render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import CartPageWithEmptySelectedItems from './CartPageWithEmptySelectedItems';
import { DELIVERY_FEE, DELIVERY_FEE_THRESHOLD } from '../src/features/constants/orderPriceSummary';

function renderCartPage() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SelectedCartProvider>
        <CartPage />
      </SelectedCartProvider>
    </MemoryRouter>
  );
}

function renderCartPageWithEmptySelectedItems() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SelectedCartProvider>
        <CartPageWithEmptySelectedItems />
      </SelectedCartProvider>
    </MemoryRouter>
  );
}

describe('빈 장바구니 테스트', async () => {
  it('장바구니에 상품이 하나도 없을 때 EmptyCartItemUI가 잘 보이는지', async () => {
    renderCartPageWithEmptySelectedItems();
    const emptyMessage = await screen.findByText('장바구니에 담은 상품이 없습니다.');
    expect(emptyMessage).toBeInTheDocument();
  });
});

describe('RTL Test', () => {
  beforeEach(() => {
    renderCartPage();
  });

  it('장바구니에서 체크박스를 누르면 배송비를 고려하여 해당 금액이 반영된다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = await screen.findAllByTestId('cart-item-card');
    expect(cartItemCards.length).toBeGreaterThan(0);

    const allSelectCheckbox = screen.getByLabelText('전체 선택');

    await user.click(allSelectCheckbox);

    const firstCard = cartItemCards[0];
    const checkbox = within(firstCard).getByRole('checkbox');

    const priceElement = within(firstCard).getByTestId('card-item-price');
    const expectedPriceText = priceElement.textContent?.trim() || '';

    // 쉼표 제거 후 숫자 변환
    const itemPrice = parseInt(expectedPriceText.replace(/,/g, ''), 10);
    expect(itemPrice).not.toBeNaN();

    const deliveryFeeElement = screen.getByTestId('delivery-fee');
    const expectedDeliveryFeeText = deliveryFeeElement.textContent?.trim() || '';

    let expectedTotal = itemPrice;
    if (itemPrice > DELIVERY_FEE_THRESHOLD) {
      expect(expectedDeliveryFeeText).toBe('0원');
    } else {
      expect(expectedDeliveryFeeText).toContain('3,000원');
      expectedTotal += DELIVERY_FEE;
    }

    const totalPurchasePrice = screen.getByTestId('total-purchase-price');
    expect(totalPurchasePrice).toBeInTheDocument();

    await user.click(checkbox);

    await waitFor(() => {
      expect(totalPurchasePrice.textContent).toContain(expectedTotal.toLocaleString() + '원');
    });
  });

  it('장바구니에서 상품을 삭제하면 해당 상품이 화면에서 사라진다.', async () => {
    const user = userEvent.setup();

    const cartItemCards = await screen.findAllByTestId('cart-item-card');
    expect(cartItemCards.length).toBeGreaterThan(0);

    const firstCard = cartItemCards[0];

    const deleteButton = within(firstCard).getByRole('button', { name: '삭제' });

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

    const quantityPlusButton = within(firstCard).getByRole('button', { name: '+' });
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
