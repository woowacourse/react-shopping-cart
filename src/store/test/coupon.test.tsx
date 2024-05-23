import { renderHook, act } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import MOCK_FORMATTED_COUPONS from '@/__mocks__/response/coupons';
import { allCouponStates } from '../atoms';
import { isCheckedIndividualCouponSelector } from '../couponSelector';

describe('초기 쿠폰을 불러올때의 테스트 코드를 작성한다.', () => {
  it('초기에 모든 쿠폰 데이터를 받아와서 초기 state로 넣어준다.', () => {
    const { result } = renderHook(() => useRecoilValue(allCouponStates), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(allCouponStates, MOCK_FORMATTED_COUPONS)}>
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current).toBeDefined();
    expect(result.current.length).toBe(MOCK_FORMATTED_COUPONS.length);
    expect(result.current).toEqual(MOCK_FORMATTED_COUPONS);
  });
});

describe('각각 쿠폰 체크 상태를 관리하는 isCheckedIndividualCouponSelector에 대한 테스트 코드를 작성한다.', () => {
  it('초기 쿠폰의 isChecked 상태를 가져온다.', () => {
    const couponId = MOCK_FORMATTED_COUPONS[0].id;

    const { result } = renderHook(
      () => useRecoilValue(isCheckedIndividualCouponSelector(couponId)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(allCouponStates, MOCK_FORMATTED_COUPONS)}>
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current).toBe(MOCK_FORMATTED_COUPONS[0].isChecked);
  });

  it('쿠폰의 isChecked 상태를 토글한다.', () => {
    const couponId = MOCK_FORMATTED_COUPONS[0].id;

    const { result } = renderHook(
      () => ({
        isChecked: useRecoilValue(isCheckedIndividualCouponSelector(couponId)),
        toggleChecked: useSetRecoilState(isCheckedIndividualCouponSelector(couponId)),
      }),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(allCouponStates, MOCK_FORMATTED_COUPONS)}>
            {children}
          </RecoilRoot>
        ),
      },
    );

    expect(result.current.isChecked).toBe(MOCK_FORMATTED_COUPONS[0].isChecked);

    act(() => {
      result.current.toggleChecked((prev) => !prev);
    });

    expect(result.current.isChecked).toBe(!MOCK_FORMATTED_COUPONS[0].isChecked);
  });
});
