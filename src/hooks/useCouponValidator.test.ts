import { RecoilRoot, useSetRecoilState } from 'recoil';

import { Coupon } from '@/types/coupon.type';
import { couponListState } from '@/store/atoms';
import { renderHook } from '@testing-library/react';
import useCouponValidator from '../hooks/useCouponValidator';

jest.mock('../api/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));

describe('useCouponValidator test', () => {
  it('[사용 가능] 쿠폰의 유효성을 확인한 후 가능 여부를 알려준다. (존재 여부, 만료일 체크)', () => {
    const { result } = renderHook(
      () => {
        const validCoupon: Coupon = {
          id: 2,
          code: 'VALID_COUPON',
          description: '유효한 쿠폰',
          discountType: 'fixed',
          expirationDate: '2025-01-01',
        };
        const setCouponList = useSetRecoilState(couponListState);
        setCouponList([validCoupon]);

        const today = new Date();

        const validateCouponList = useCouponValidator({ date: today });

        return validateCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.length).toBe(1);
  });

  it('[사용 불가능] 쿠폰의 유효성을 확인한 후 가능 여부를 알려준다. (존재 여부, 만료일 체크)', () => {
    const { result } = renderHook(
      () => {
        const expiredCoupon: Coupon = {
          id: 1,
          code: 'EXPIRED_COUPON',
          description: '만료된 쿠폰',
          discountType: 'fixed',
          expirationDate: '2024-05-01',
        };
        const setCouponList = useSetRecoilState(couponListState);
        setCouponList([expiredCoupon]);

        const today = new Date();

        const validateCouponList = useCouponValidator({ date: today });

        return validateCouponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.length).toBe(0);
  });
});
