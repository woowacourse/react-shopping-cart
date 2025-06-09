import { describe, it } from 'vitest';
import { validateExpirationDate } from '../src/features/coupon/utils/validateExpirationDate';
import { validateAvailableTime } from '../src/features/coupon/utils/validateAvailableTime';
import { MemoryRouter } from 'react-router';
import { CartProvider } from '../src/shared/context/CartProvider';
import { render, screen, within } from '@testing-library/react';
import OrderReviewPage from '../src/pages/OrderReview/OrderReviewPage';
import userEvent from '@testing-library/user-event';

vi.mock('../src/features/cart/utils/localStorageService', () => ({
  getSelectedCartItemsFromLocalStorage: () => [mockCartItem],
}));

const mockCartItem = {
  id: 1551,
  product: {
    id: 36,
    name: '패셔니스타 유담이',
    price: 30000,
    imageUrl: 'https://image.yes24.com/goods/84933797/XL',
  },
  category: '패션잡화',
  quantity: 3,
};

function renderWithRoutes() {
  return render(
    <MemoryRouter initialEntries={['/review']}>
      <CartProvider>
        <OrderReviewPage />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('쿠폰이 유효한지 테스트', () => {
  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이후면 true를 반환한다.', () => {
    const currentDate = new Date();
    const couponExpirationDate = '2028-12-31';
    const isCouponExpirationDateValid = validateExpirationDate(currentDate, couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(true);
  });

  it('validateExpirationDate 함수를 사용해서 현재 날짜보다 이전이면 false를 반환한다.', () => {
    const currentDate = new Date();
    const couponExpirationDate = '2025-06-05';
    const isCouponExpirationDateValid = validateExpirationDate(currentDate, couponExpirationDate);
    expect(isCouponExpirationDateValid).toBe(false);
  });

  it('validateAvailableTime 함수를 사용해서 현재 시간이 쿠폰 적용 시간이면 true를 반환한다.', () => {
    const couponAvailableTime = {
      start: '04:00:00',
      end: '07:00:00',
    };

    const currentDate = new Date('2025-06-06T05:00:00'); // 현재 시간을 5시로 설정

    const isCouponAvailableTimeValid = validateAvailableTime(currentDate, couponAvailableTime);
    expect(isCouponAvailableTimeValid).toBe(true);
  });
  it('validateAvailableTime 함수를 사용해서 현재 시간이 쿠폰 적용 시간이 아니면 false를 반환한다.', () => {
    const couponAvailableTime = {
      start: '04:00:00',
      end: '07:00:00',
    };

    const currentDate = new Date('2025-06-06T08:00:00'); // 현재 시간을 8시로 설정

    const isCouponAvailableTimeValid = validateAvailableTime(currentDate, couponAvailableTime);
    expect(isCouponAvailableTimeValid).toBe(false);
  });
});

describe('쿠폰 시나리오 테스트', () => {
  beforeEach(() => {
    localStorage.setItem('selected-cart-items', JSON.stringify([mockCartItem]));

    renderWithRoutes();
  });

  it(`오후 시간에 도시에 사는 사용자가 30,000원 동일 상품을 3개 담고 
  "2개 구매 시 1개 무료 쿠폰"와 "5만원 이상 구매 시 무료 배송 쿠폰"를 받아서 
  33,000 할인 받고 배송비 3,000을 포함하여 총 결제 금액 60,000원 지불한다.`, async () => {
    const user = userEvent.setup();

    const couponButton = await screen.findByRole('button', { name: '쿠폰 적용' });
    await user.click(couponButton);

    const couponUseButton = await screen.findByRole('button', {
      name: '총 33,000원 할인 쿠폰 사용하기',
    });
    expect(couponUseButton).toBeInTheDocument();
    await user.click(couponUseButton);

    const totalPrice = await screen.findByTestId('total-order-price');
    expect(within(totalPrice).getByText('90,000원')).toBeInTheDocument();

    const totalDiscountPrice = await screen.findByTestId('coupon-discount-amount');
    expect(within(totalDiscountPrice).getByText('-33,000원')).toBeInTheDocument();

    const deliveryFee = await screen.findByTestId('delivery-fee');
    expect(within(deliveryFee).getByText('3,000원')).toBeInTheDocument();

    const totalPurchasePrice = await screen.findByTestId('total-purchase-price');
    expect(within(totalPurchasePrice).getByText('60,000원')).toBeInTheDocument();
  });
});
