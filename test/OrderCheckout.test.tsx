import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import * as couponApi from '@/api/order';
import { CartItem } from '@/features/Cart/types/Cart.types';
import { OrderCheckoutPage } from '@/pages/OrderCheckoutPage';

import { createTestCartItems } from './Cart.test';
import { Coupons } from './Coupons.data';
import {
  createCartItem,
  expectAllCheckboxesDisabled,
  expectCouponState,
  expectCouponUsageMessage,
  mockExpiredCouponsScenario,
  mockTime,
} from './test-helper';

const renderOrderCheckoutPage = (customCartItems?: CartItem[]) => {
  const cartItems = customCartItems || createTestCartItems();

  return render(
    <MemoryRouter initialEntries={[{ pathname: '/order-checkout', state: cartItems }]}>
      <OrderCheckoutPage />
    </MemoryRouter>
  );
};

vi.mock('@/api/order');
const mockCouponApi = vi.mocked(couponApi);

describe('주문 확인 페이지를 렌더링 한다.', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('주문 확인 페이지에 진입했을 때, 주문 확인 페이지가 렌더링된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    await act(async () => {
      renderOrderCheckoutPage();
    });

    // When: 주문 결제 페이지에 진입했을 때, 주문 결제 페이지가 렌더링된다.
    // Then: 주문 결제 페이지가 렌더링된다.
    expect(screen.getByText('주문 확인')).toBeInTheDocument();
    expect(
      screen.getByText(/총 2종류의 상품 3개를 주문합니다.*최종 결제 금액을 확인해 주세요/)
    ).toBeInTheDocument();
  });
});
