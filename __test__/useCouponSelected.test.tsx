import { act } from '@testing-library/react';
import { renderHookUseCouponSelected } from './renderHook.util';

describe('useCouponSelected hook 테스트', () => {
  it('activeCoupon이 2개인 상황에서 하나의 쿠폰을 더 선택할 수 없다.', () => {
    const { result } = renderHookUseCouponSelected({
      couponSelected: { BOGO: true, FIXED5000: true },
      activeCoupons: ['BOGO', 'FIXED5000'],
    });

    act(() => {
      result.current.handleToggleCouponCheckbox('FREESHIPPING');
    });

    expect(result.current.couponSelected).toEqual({ BOGO: true, FIXED5000: true });
    expect(result.current.activeCouponCodes).toEqual(['BOGO', 'FIXED5000']);
  });

  it('activeCoupon이 0개인 상황에서 두개의 쿠폰을 선택하면, 두개의 쿠폰이 active 상태가 된다.', () => {
    const { result } = renderHookUseCouponSelected({
      couponSelected: {
        FIXED5000: false,
        BOGO: false,
      },
      activeCoupons: [],
    });

    act(() => {
      result.current.handleToggleCouponCheckbox('BOGO');
    });

    act(() => {
      result.current.handleToggleCouponCheckbox('FIXED5000');
    });

    expect(result.current.couponSelected).toEqual({
      FIXED5000: true,
      BOGO: true,
    });
    expect(result.current.activeCouponCodes).toEqual(['BOGO', 'FIXED5000']);
  });
});
