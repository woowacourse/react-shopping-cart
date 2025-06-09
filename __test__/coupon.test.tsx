import { describe, it } from 'vitest';
import { validateExpirationDate } from '../src/features/coupon/utils/validateExpirationDate';
import { validateAvailableTime } from '../src/features/coupon/utils/validateAvailableTime';
import { MemoryRouter } from 'react-router';
import { CartProvider } from '../src/shared/context/CartProvider';
import { render, renderHook, screen, waitFor, within } from '@testing-library/react';
import OrderReviewPage from '../src/pages/OrderReview/OrderReviewPage';
import userEvent from '@testing-library/user-event';
import { getSelectedCartItemsFromLocalStorage } from '../src/features/cart/utils/localStorageService';
import { vi, Mock } from 'vitest';
import { mockCartItem_1, mockCartItem_2 } from './data';
import useCoupons from '../src/features/coupon/hooks/useCoupons';

vi.mock('../src/features/cart/utils/localStorageService', () => ({
  getSelectedCartItemsFromLocalStorage: vi.fn(),
}));

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

describe('쿠폰 조합 테스트', () => {
  it('최적의 두 쿠폰 조합을 반환한다.', async () => {
    const { result } = renderHook(() => useCoupons());

    await waitFor(() => expect(result.current.isCouponLoading).toBe(false));

    const bestCoupons = result.current.getBestTwoCoupons(mockCartItem_2[1], 300000, 3000);

    expect(bestCoupons.length).toBe(2);
    expect(bestCoupons[0].discountPrice).toBeGreaterThanOrEqual(bestCoupons[1].discountPrice);
  });
});

describe('오후 시간 사용자 쿠폰 사용 시나리오 테스트', () => {
  it(`오후 시간에 도시에 사는 사용자가 30,000원 동일 상품을 3개 담고 
  "2개 구매 시 1개 무료 쿠폰"와 "5만원 이상 구매 시 무료 배송 쿠폰"를 받아서 
  33,000 할인 받고 배송비 3,000을 포함하여 총 결제 금액 60,000원 지불한다.`, async () => {
    (getSelectedCartItemsFromLocalStorage as Mock).mockReturnValue(mockCartItem_1);
    renderWithRoutes();

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

  it(`오후 시간에 도시 외곽에 사는 사용자가  30,000원 상품 1개, 100,000원 상품 3개를 담고 "5,000원 할인 쿠폰"와
    "2개 구매 시 1개 무료 쿠폰"를 받아서 105,000원 할인 받고 배송비 3,000을 포함하여 총 결제 금액 228,000원 지불한다.`, async () => {
    (getSelectedCartItemsFromLocalStorage as Mock).mockReturnValue(mockCartItem_2);
    renderWithRoutes();

    const user = userEvent.setup();

    const checkbox = screen.getByTestId('suburb-checkbox');
    await user.click(checkbox);

    const couponButton = await screen.findByRole('button', { name: '쿠폰 적용' });
    await user.click(couponButton);

    const couponUseButton = await screen.findByRole('button', {
      name: '총 105,000원 할인 쿠폰 사용하기',
    });
    await user.click(couponUseButton);

    const totalPrice = await screen.findByTestId('total-order-price');
    expect(within(totalPrice).getByText('330,000원')).toBeInTheDocument();
    const totalDiscountPrice = await screen.findByTestId('coupon-discount-amount');
    expect(within(totalDiscountPrice).getByText('-105,000원')).toBeInTheDocument();
    const deliveryFee = await screen.findByTestId('delivery-fee');
    expect(within(deliveryFee).getByText('3,000원')).toBeInTheDocument();
    const totalPurchasePrice = await screen.findByTestId('total-purchase-price');
    expect(within(totalPurchasePrice).getByText('228,000원')).toBeInTheDocument();
  });
});

describe('오전 시간 사용자 쿠폰 사용 시나리오 테스트', () => {
  beforeAll(() => {
    vi.useRealTimers();
    vi.setSystemTime(new Date('2025-06-06T05:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it(`오전 시간에 도시 외곽에 사는 사용자가  30,000원 상품 1개, 100,000원 상품 3개를 담고 "2개 구매 시 1개 무료 쿠폰"와
    "미라클모닝 30% 할인 쿠폰"를 받아서 199,000원 할인 받고 배송비 3,000을 포함하여 총 결제 금액 228,000원 지불한다.`, async () => {
    (getSelectedCartItemsFromLocalStorage as Mock).mockReturnValue(mockCartItem_2);
    renderWithRoutes();

    const user = userEvent.setup();

    const checkbox = screen.getByTestId('suburb-checkbox');
    await user.click(checkbox);

    const couponButton = await screen.findByRole('button', { name: '쿠폰 적용' });
    await user.click(couponButton);

    const couponUseButton = await screen.findByRole('button', {
      name: '총 199,000원 할인 쿠폰 사용하기',
    });
    await user.click(couponUseButton);

    const totalPrice = await screen.findByTestId('total-order-price');
    expect(within(totalPrice).getByText('330,000원')).toBeInTheDocument();
    const totalDiscountPrice = await screen.findByTestId('coupon-discount-amount');
    expect(within(totalDiscountPrice).getByText('-199,000원')).toBeInTheDocument();
    const deliveryFee = await screen.findByTestId('delivery-fee');
    expect(within(deliveryFee).getByText('3,000원')).toBeInTheDocument();
    const totalPurchasePrice = await screen.findByTestId('total-purchase-price');
    expect(within(totalPurchasePrice).getByText('134,000원')).toBeInTheDocument();
  });
});
