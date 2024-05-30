import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useCouponDiscountCalculator } from './useCouponDiscountCalculator';
import { selectedCartItems, shippingFeeState, selectedCoupons } from '../../recoil/atoms';
import { COUPON_DISCOUNT_TYPE } from '../../constants/constants';

const mockCoupons = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: COUPON_DISCOUNT_TYPE.FIXED,
    minimumAmount: 100000,
    expirationDate: '2024-11-30',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: COUPON_DISCOUNT_TYPE.BUY_X_GET_Y,
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: '2024-05-30',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: COUPON_DISCOUNT_TYPE.FREE_SHIPPING,
    minimumAmount: 50000,
    expirationDate: '2024-08-31',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discount: 30,
    discountType: COUPON_DISCOUNT_TYPE.PERCENTAGE,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    expirationDate: '2024-07-31',
  },
];

describe('useCouponDiscountCalculator', () => {
  it('고정 할인 쿠폰 적용', () => {
    const { result } = renderHook(() => useCouponDiscountCalculator(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItems, [
              { cartItemId: 1, name: 'Test Item', quantity: 2, price: 50000, imageUrl: '' },
            ]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const orderTotal = 150000;
    const discountAmount = result.current.calculateDiscountAmount(mockCoupons[0], orderTotal);

    expect(discountAmount).toBe(5000);
  });

  it('퍼센트 할인 쿠폰 적용', () => {
    const { result } = renderHook(() => useCouponDiscountCalculator(mockCoupons), {
      wrapper: RecoilRoot,
    });

    const orderTotal = 150000;
    const discountAmount = result.current.calculateDiscountAmount(mockCoupons[3], orderTotal);

    expect(discountAmount).toBe(45000); // 150000 * 30% = 45000
  });

  it('무료 배송 쿠폰 적용', () => {
    const { result } = renderHook(() => useCouponDiscountCalculator(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItems, [
              { cartItemId: 1, name: 'Test Item', quantity: 2, price: 50000, imageUrl: '' },
            ]);
            set(shippingFeeState, {
              isFree: true,
              shipping: 3000,
            });
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const orderTotal = 80000;
    const discountAmount = result.current.calculateDiscountAmount(mockCoupons[2], orderTotal);

    expect(discountAmount).toBe(3000); // 배송비 3000원
  });

  it('1+1 쿠폰 적용', () => {
    const { result } = renderHook(() => useCouponDiscountCalculator(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItems, [
              { cartItemId: 1, name: 'Test Item1', quantity: 2, price: 50000, imageUrl: '' },
              { cartItemId: 2, name: 'Test Item2', quantity: 2, price: 45000, imageUrl: '' },
            ]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    const orderTotal = 150000;
    const discountAmount = result.current.calculateDiscountAmount(mockCoupons[1], orderTotal);

    expect(discountAmount).toBe(50000); // 가장 비싼 상품의 가격
  });

  // NOTE: 실패
  it('최적 할인 계산', () => {
    const coupons = [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        discount: 5000,
        discountType: COUPON_DISCOUNT_TYPE.FIXED,
        minimumAmount: 100000,
        expirationDate: '2024-11-30',
      },
      {
        id: 4,
        code: 'MIRACLESALE',
        description: '미라클모닝 30% 할인 쿠폰',
        discount: 30,
        discountType: COUPON_DISCOUNT_TYPE.PERCENTAGE,
        expirationDate: '2024-07-31',
      },
    ];

    const { result } = renderHook(() => useCouponDiscountCalculator(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCoupons, coupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const orderTotal = 200000; // 주문 금액 200,000
    const percentageDiscount = orderTotal * 0.3; // 60,000원 할인
    const fixedDiscount = 5000; // 5,000원 할인
    const expectedDiscountedAmount = orderTotal - percentageDiscount - fixedDiscount;

    const discountedAmount = result.current.calculateBestDiscount(orderTotal);
    expect(discountedAmount).toBe(expectedDiscountedAmount);
  });
});
