import { Coupon } from '../type';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useCoupons from '../hooks/useCoupons';

const DUMMY_COUPON: Coupon[] = [
  {
    id: 5,
    code: 'SUMMER20',
    description: '여름맞이 20% 할인 쿠폰',
    discount: 20,
    discountType: 'percentage',
    availableTime: {
      start: '00:00:00',
      end: '23:59:59',
    },
    expirationDate: '2024-08-15',
  },
  {
    id: 6,
    code: 'WELCOMEBACK',
    description: '재방문 고객 대상 10,000원 할인 쿠폰',
    discount: 10000,
    discountType: 'fixed',
    minimumAmount: 50000,
    expirationDate: '2024-12-31',
  },
];

describe('useCoupons', () => {
  it('등록되지 않은 쿠폰의 경우 isSelectedCoupon의 값은 false이다', () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.isSelectedCoupon(DUMMY_COUPON[0])).toBe(false);
  });

  it('addCoupon을 통해 쿠폰을 추가할 수 있다.', () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.addCoupon(DUMMY_COUPON[0]);
    });
    expect(result.current.isSelectedCoupon(DUMMY_COUPON[0])).toBe(true);
  });

  it('deleteCoupon을 통해 쿠폰을 삭제할 수 있다.', () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      result.current.deleteCoupon(DUMMY_COUPON[0]);
    });

    expect(result.current.isSelectedCoupon(DUMMY_COUPON[0])).toBe(false);
  });
});
