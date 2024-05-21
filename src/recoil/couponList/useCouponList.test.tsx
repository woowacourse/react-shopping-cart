import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { mockCouponList } from '../../mocks/couponList';
import { act } from 'react';
import useCouponList from './useCouponList';
import { couponListState } from './couponListState';

jest.mock('../../apis/requests/couponList', () => ({
  requestCouponList: jest.fn().mockImplementation(() => mockCouponList),
}));

describe('useCouponList', () => {
  it('쿠폰 목록을 업데이트(초기화) 한다.', async () => {
    const { result } = renderHook(
      () => {
        const { updateCouponList } = useCouponList();
        const couponList = useRecoilValue(couponListState);

        return { updateCouponList, couponList };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={({ set }) => set(couponListState, mockCouponList)}>{children}</RecoilRoot>
        ),
      },
    );

    await act(() => result.current.updateCouponList());

    expect(result.current.couponList).toBeDefined();
    expect(result.current.couponList.length).toBe(mockCouponList.length);
  });
});
