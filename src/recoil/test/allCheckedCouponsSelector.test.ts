import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { couponDetailState, couponsState } from '../atoms';
import { allCheckedCouponsSelector } from '../selectors';
import { act } from 'react';
import { mockCoupons } from '../../mocks/coupons';

describe('checkedItemsSelector', () => {
  it('mockCoupons[0] mockCoupons[2] 선택되었다고 가정할 때 길이가 2인 배열을 반환하다.', () => {
    const { result } = renderHook(
      () => {
        const setCoupons = useSetRecoilState(couponsState);
        const setCouponsDetails0 = useSetRecoilState(
          couponDetailState(mockCoupons[0].id),
        );
        const setCouponsDetails1 = useSetRecoilState(
          couponDetailState(mockCoupons[1].id),
        );
        const setCouponsDetails2 = useSetRecoilState(
          couponDetailState(mockCoupons[2].id),
        );
        const setCouponsDetails3 = useSetRecoilState(
          couponDetailState(mockCoupons[3].id),
        );
        const checkedCoupons = useRecoilValue(allCheckedCouponsSelector);

        return {
          setCoupons,
          setCouponsDetails0,
          setCouponsDetails1,
          setCouponsDetails2,
          setCouponsDetails3,
          checkedCoupons,
        };
      },
      { wrapper: RecoilRoot },
    );

    act(() => {
      result.current.setCoupons(mockCoupons);
    });

    act(() => {
      result.current.setCouponsDetails0(true);
      result.current.setCouponsDetails1(false);
      result.current.setCouponsDetails2(true);
      result.current.setCouponsDetails3(false);
    });

    expect(result.current.checkedCoupons.length).toBe(2);
  });
});
