import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useSelectedCouponList from './useSelectedCouponList';
import { selectedCouponListState } from '../../recoil/coupon/atom';

describe('useSelectedCouponList', () => {
  const MOCK_COUPONS: Coupon[] = [
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

  it('selectedCouponList는 "저장된 선택된 쿠폰 목록" 상태를 반환해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, MOCK_COUPONS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.selectedCouponList).toEqual(MOCK_COUPONS);
  });

  it('selectedCouponAmount는 선택된 쿠폰의 수를 반환해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCouponListState, MOCK_COUPONS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.selectedCouponAmount).toBe(MOCK_COUPONS.length);
  });
});
