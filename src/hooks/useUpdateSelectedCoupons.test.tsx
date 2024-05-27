import { renderHook } from '@testing-library/react';
import { useUpdateSelectedCoupons } from './useUpdateSelectedCoupons';
import { MutableSnapshot, RecoilRoot, useRecoilValue } from 'recoil';
import { couponsState, selectedCouponsState } from '../recoil/atoms';
import { mockCoupons } from '../mocks/coupons';
import { act } from 'react';

describe('useUpdateSelectedCoupons', () => {
  it('couponsState의 상태와 selectedCouponsState가 일치해야 한다.', () => {
    const { result } = renderHook(
      () => {
        const { updateSelectedCoupons } = useUpdateSelectedCoupons();
        const selectedCoupons = useRecoilValue(selectedCouponsState);
        return { updateSelectedCoupons, selectedCoupons };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }: MutableSnapshot) => {
              set(couponsState, mockCoupons);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      },
    );
    act(() => {
      result.current.updateSelectedCoupons();
    });

    expect(result.current.selectedCoupons).toEqual(mockCoupons);
  });
});
