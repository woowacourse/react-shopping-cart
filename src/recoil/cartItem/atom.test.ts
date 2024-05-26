import { act } from 'react';

import { RecoilRoot, useRecoilState } from 'recoil';

import { renderHook } from '@testing-library/react';

import { cartItemListState, selectedCartItemIdListState } from './atom';
import {
  CART_ITEM_LIST_STATE_TEST_CASES,
  SELECTED_CART_ITEM_ID_STATE_TEST_CASES,
} from './mock';

describe('CartItem/atom.ts 테스트', () => {
  describe('selectedCartItemIdListState 테스트', () => {
    it('초기값은 [] 여야 한다.', () => {
      const { result } = renderHook(
        () => useRecoilState(selectedCartItemIdListState),
        {
          wrapper: RecoilRoot,
        },
      );

      expect(result.current[0]).toEqual([]);
    });

    it.each(SELECTED_CART_ITEM_ID_STATE_TEST_CASES)(
      'setState를 호출하여 "${input}"으로 값을 설정한 경우, 상태는 같은 값인 "${expected}"으로 설정되어야 한다.',
      ({ input, expected }: TEST_ITEM_PROP<number[]>) => {
        const { result } = renderHook(
          () => useRecoilState(selectedCartItemIdListState),
          {
            wrapper: RecoilRoot,
          },
        );

        act(() => result.current[1](input));

        expect(result.current[0]).toEqual(expected);
      },
    );
  });

  describe('cartItemListState 테스트', () => {
    it('초기값은 [] 여야 한다.', () => {
      const { result } = renderHook(() => useRecoilState(cartItemListState), {
        wrapper: RecoilRoot,
      });

      expect(result.current[0]).toEqual([]);
    });

    it.each(CART_ITEM_LIST_STATE_TEST_CASES)(
      'setState를 호출하여 "${input}"으로 값을 설정한 경우, 상태는 같은 값인 "${expected}"으로 설정되어야 한다.',
      ({ input, expected }: TEST_ITEM_PROP<CartItem[]>) => {
        const { result } = renderHook(() => useRecoilState(cartItemListState), {
          wrapper: RecoilRoot,
        });

        act(() => result.current[1](input));

        expect(result.current[0]).toEqual(expected);
      },
    );
  });
});
