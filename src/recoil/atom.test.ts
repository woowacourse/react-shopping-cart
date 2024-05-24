import { RecoilRoot, useRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import { selectedCartItems } from './atoms';
import { CartItem } from '@type/cartItem';

describe('상품 선택 기능', () => {
  it('초기값으로는 아무것도 선택되지 않는다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItems), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toEqual(0);
  });

  it('아이템을 선택하면 선택한 아이템이 선택 상태로 반영된다.', () => {
    // given
    const selectedItems: CartItem = {
      id: 1,
      quantity: 2,
      product: {
        id: 1,
        name: '춘식이',
        price: 15000000,
        imageUrl:
          'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171',
        category: '고양이',
      },
    };

    const { result } = renderHook(() => useRecoilState(selectedCartItems), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1]([selectedItems]);
    });

    // then
    expect(result.current[0]).toEqual([selectedItems]);
  });
});
