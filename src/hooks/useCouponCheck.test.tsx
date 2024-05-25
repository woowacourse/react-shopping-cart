import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { useCouponCheck } from './useCouponCheck';

const mockCoupons = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-05-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2024-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

describe('useCouponApplicabilityChecker', () => {
  it('주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가', () => {
    const { result } = renderHook(() => useCouponCheck(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCouponListState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[0], 50000)).toBe(false);
  });

  it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능', () => {
    const { result } = renderHook(() => useCouponCheck(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCouponListState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[0], 110000)).toBe(true);
  });
});

describe('쿠폰 사용 가능 시간 확인', () => {
  it('사용 가능 시간 외에는 쿠폰 적용 불가', () => {
    const testTime = new Date('2023-05-01T08:00:00');

    const { result } = renderHook(() => useCouponCheck(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCouponListState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[3], 100000, testTime)).toBe(false);
  });

  it('사용 가능 시간 내에는 쿠폰 적용 가능', () => {
    const testTime = new Date('2023-05-01T07:00:00');
    const { result } = renderHook(() => useCouponCheck(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCouponListState, mockCoupons)}>{children}</RecoilRoot>
      ),
    });
    expect(result.current.isCouponApplicable(mockCoupons[3], 100000, testTime)).toBe(true);
  });
});
