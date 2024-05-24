import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { couponListState, filteredCartItemState } from '@/store/atoms';

import { INIT_CART_ITEM_STATE } from '@/constants/defaultStateValue';
import { MOCK_COUPON_LIST } from '@/constants/_mock/mockCouponList';
import { act } from 'react';
import { renderHook } from '@testing-library/react';

describe('filteredCartItemState test', () => {
  const mockId = 1;
  it('초기값은 default value로 지정된다.', () => {
    const { result } = renderHook(
      () => useRecoilState(filteredCartItemState(mockId)),
      {
        wrapper: RecoilRoot,
      }
    );
    expect(result.current[0]).toBe(INIT_CART_ITEM_STATE);
    expect(1).toBe(1);
  });

  it('값을 변경할 수 있다.', () => {
    const { result } = renderHook(
      () => useRecoilState(filteredCartItemState(mockId)),
      {
        wrapper: RecoilRoot,
      }
    );

    const changeQuantity = { ...result.current[0] };
    changeQuantity.quantity = 3;
    act(() => {
      result.current[1](changeQuantity);
    });
    expect(result.current[0]).toBe(changeQuantity);

    const changeIsSelected = { ...result.current[0] };
    changeIsSelected.isSelected = true;

    act(() => {
      result.current[1](changeIsSelected);
    });
    expect(result.current[0]).toBe(changeIsSelected);
  });
});

describe('couponListState test', () => {
  it('쿠폰 목록을 받아올 수 있다.', () => {
    const { result } = renderHook(
      () => {
        const setCouponList = useSetRecoilState(couponListState);
        setCouponList(MOCK_COUPON_LIST);

        const couponList = useRecoilValue(couponListState);

        return couponList;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.length).not.toBe(null);
  });
});
