import { act } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { renderHook } from '@testing-library/react';
import { couponListState, selectedCouponListState } from './atom';
import {
  COUPON_LIST_STATE_TEST_CASES,
  SELECTED_COUPON_LIST_STATE_TEST_CASES,
} from './mock';

describe('Coupon/atom.ts 테스트', () => {
  describe('couponListState 테스트', () => {
    it('초기값은 [] 여야 한다.', () => {
      const { result } = renderHook(() => useRecoilState(couponListState), {
        wrapper: RecoilRoot,
      });

      expect(result.current[0]).toEqual([]);
    });

    it.each(COUPON_LIST_STATE_TEST_CASES)(
      'setState를 호출하여 "${input}"으로 값을 설정한 경우, 상태는 같은 값인 "${expected}"으로 설정되어야 한다.',
      ({ input, expected }: TEST_ITEM_PROP<Coupon[]>) => {
        const { result } = renderHook(() => useRecoilState(couponListState), {
          wrapper: RecoilRoot,
        });

        act(() => result.current[1](input));

        expect(result.current[0]).toEqual(expected);
      },
    );
  });

  describe('selectedCouponListState 테스트', () => {
    it('초기값은 [] 여야 한다.', () => {
      const { result } = renderHook(
        () => useRecoilState(selectedCouponListState),
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current[0]).toEqual([]);
    });

    it.each(SELECTED_COUPON_LIST_STATE_TEST_CASES)(
      'setState를 호출하여 "${input}"으로 값을 설정한 경우, 상태는 같은 값인 "${expected}"으로 설정되어야 한다.',
      ({ input, expected }) => {
        const { result } = renderHook(
          () => useRecoilState(selectedCouponListState),
          {
            wrapper: RecoilRoot,
          },
        );

        act(() => result.current[1](input));

        expect(result.current[0]).toEqual(expected);
      },
    );
  });
});
