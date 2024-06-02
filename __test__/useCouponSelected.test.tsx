import { activeCouponCodesState, couponSelectedState } from '@store/couponStore';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import useCouponSelected from '@hooks/coupon/useCouponSelected';

interface renderHookProps {
  couponSelected: Record<string, boolean>;
  activeCoupons: string[];
}

const renderHook_useCouponSelected_activeCoupon = ({
  couponSelected,
  activeCoupons,
}: renderHookProps) => {
  return renderHook(
    () => {
      const { handleToggleCouponCheckbox, couponSelected } = useCouponSelected();
      const activeCouponCodes = useRecoilValue(activeCouponCodesState);

      return { handleToggleCouponCheckbox, couponSelected, activeCouponCodes };
    },
    {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(couponSelectedState, couponSelected);
            set(activeCouponCodesState, activeCoupons);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    },
  );
};

describe('useCouponSelected hook 테스트', () => {
  it('activeCoupon이 2개인 상황에서 하나의 쿠폰을 더 선택할 수 없다.', () => {
    const { result } = renderHook_useCouponSelected_activeCoupon({
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
    const { result } = renderHook_useCouponSelected_activeCoupon({
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
