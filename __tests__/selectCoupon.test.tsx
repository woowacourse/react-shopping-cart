import { useCouponSimulator } from '@hooks/orderConfirm';
import { act } from '@testing-library/react';

import { INITIAL_COUPONS } from './constants/coupon';
import executeSelectedCouponRenderHook from './utils/executeSelectedCouponRenderHook';

describe('Coupon Simulator Tests', () => {
  it('1개의 쿠폰은 선택 가능하다', () => {
    const { result } = executeSelectedCouponRenderHook(() => useCouponSimulator());

    act(() => {
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[0]);
    });

    expect(result.current.temporarySelectedCouponList).toStrictEqual([INITIAL_COUPONS[0]]);
  });

  it('2개의 쿠폰은 선택 가능하다', () => {
    const { result } = executeSelectedCouponRenderHook(() => useCouponSimulator());

    act(() => {
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[0]);
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[1]);
    });

    expect(result.current.temporarySelectedCouponList).toStrictEqual([INITIAL_COUPONS[0], INITIAL_COUPONS[1]]);
  });

  it('쿠폰 3개는 최대 쿠폰 선택 갯수가 2개이므로 가장 이전에 적용한 쿠폰 2개만 적용된다', () => {
    const { result } = executeSelectedCouponRenderHook(() => useCouponSimulator());

    act(() => {
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[0]);
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[1]);
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[2]);
    });

    expect(result.current.temporarySelectedCouponList).toStrictEqual([INITIAL_COUPONS[0], INITIAL_COUPONS[1]]);
  });

  it('이미 선택된 쿠폰을 다시 선택한다면 그 쿠폰은 적용되지 않는다.', () => {
    const { result } = executeSelectedCouponRenderHook(() => useCouponSimulator());

    act(() => {
      result.current.onAddTemporarySelectedCoupon(true, INITIAL_COUPONS[0]);
      result.current.onAddTemporarySelectedCoupon(false, INITIAL_COUPONS[0]);
    });

    expect(result.current.temporarySelectedCouponList).toStrictEqual([]);
  });
});
