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

  it('장바구니에 담긴 상품의 총 금액이 10만원을 넘었을 때, 무료배송 쿠폰이 적용된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    const cartItems = [createCartItem(1, '상품 1', 50000), createCartItem(2, '상품 2', 60000)];

    await act(async () => {
      renderOrderCheckoutPage(cartItems);
    });

    // When: 주문 결제 페이지에 진입했을 때, 상품의 총 금액이 10만원을 넘었을 때 무료배송 쿠폰이 적용된다.
    // Then: 무료배송 쿠폰이 적용되어 배송비가 0원으로 표시된다.
    expect(screen.getByText('0원')).toBeInTheDocument();
  });

  it('제주도 및 도서 산간 지역의 경우, 배송비가 3000원으로 표시된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    await act(async () => {
      renderOrderCheckoutPage();
    });

    // When: 제주도 및 도서 산간 지역을 클릭
    const deliveryZoneButton = screen.getByText('제주도 및 도서 산간 지역');
    await user.click(deliveryZoneButton);

    // Then: 제주도 및 도서 산간 지역의 경우, 배송비가 3000원으로 표시된다.
    expect(screen.getByText('3,000원')).toBeInTheDocument();
  });

  it('오늘 날짜가 만료일 내에 존재하지 않는 경우, 쿠폰이 비활성화된다.', async () => {
    mockExpiredCouponsScenario();
    mockCouponApi.getCoupons.mockImplementation(async () => {
      return Promise.resolve([...Coupons]);
    });

    await act(async () => {
      renderOrderCheckoutPage();
    });

    expect(mockCouponApi.getCoupons).toHaveBeenCalled();

    const couponButton = screen.getByText('쿠폰 적용');
    expect(screen.getByText('쿠폰 적용')).toBeInTheDocument();
    await user.click(couponButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    expectAllCheckboxesDisabled();
  });

  it('장바구니에 담긴 상품의 총 금액이 10만원을 넘었을 때, FIXED5000 할인 쿠폰이 적용된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    const cartItems = [createCartItem(1, '상품 1', 60000), createCartItem(2, '상품 2', 50000)];
    // When: 주문 결제 페이지에 진입했을 때, 상품의 총 금액이 10만원을 넘었을 때 5000원 할인 쿠폰이 적용된다.
    await act(async () => {
      renderOrderCheckoutPage(cartItems);
    });

    const couponButton = screen.getByText('쿠폰 적용');
    await user.click(couponButton);

    expectCouponState('5,000원 할인 쿠폰');

    expect(screen.getByText('총 5,000원 할인 쿠폰 사용하기')).toBeInTheDocument();

    // Then: 5000원 할인 쿠폰이 적용되어 최종 결제 금액이 95000원으로 표시된다.
    expect(screen.getByText('110,000원')).toBeInTheDocument();
    expect(screen.getByText('105,000원')).toBeInTheDocument();
    expect(screen.getByText('0원')).toBeInTheDocument();
  });

  it('장바구니에 2개 구매 시 1개 무료 쿠폰이 적용된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    const cartItems = [createCartItem(1, '상품 1', 15000, 3)];

    await act(async () => {
      renderOrderCheckoutPage(cartItems);
    });

    const couponButton = screen.getByText('쿠폰 적용');
    await user.click(couponButton);

    expectCouponState('2개 구매 시 1개 무료 쿠폰');

    expect(screen.getByText('45,000원')).toBeInTheDocument();
    expect(screen.getByText('3,000원')).toBeInTheDocument();
    expect(screen.getByText('33,000원')).toBeInTheDocument();
  });

  it('장바구니에 담긴 상품의 총 금액이 5만원 이상, 10만원 이하일 때, 무료배송 쿠폰이 적용된다.', async () => {
    // Given: 주문 결제 페이지를 렌더링한다.
    const cartItems = [createCartItem(1, '상품 1', 50000), createCartItem(2, '상품 2', 30000)];

    // When: 주문 결제 페이지에 진입했을 때, 상품의 총 금액이 5만원 이상, 10만원 이하일 때 무료배송 쿠폰이 적용된다.
    await act(async () => {
      renderOrderCheckoutPage(cartItems);
    });

    const couponButton = screen.getByText('쿠폰 적용');
    await user.click(couponButton);

    expectCouponState('5만원 이상 구매 시 무료 배송 쿠폰');

    // Then: 무료배송 쿠폰이 적용되어 할인 금액으로 -3000원이 표시된다.
    expect(screen.getByText('총 3,000원 할인 쿠폰 사용하기')).toBeInTheDocument();
  });
});
