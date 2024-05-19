import { RecoilRoot, useRecoilState } from 'recoil';
import { act, renderHook } from '@testing-library/react';
import { SelectedCartItem, selectedCartItems, itemQuantityState, ItemQuantity } from './atoms';

describe('상품 선택 기능', () => {
  it('초기값으로는 아무것도 선택되지 않는다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItems), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toEqual(0);
  });

  it('아이템을 선택하면 선택한 아이템이 선택 상태로 반영된다.', () => {
    // given
    const selectedItems: SelectedCartItem = {
      cartItemId: 1,
      quantity: 2,
      price: 3000,
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

describe('수량 변경 기능', () => {
  it('값을 변경하면 그 값이 반영된다.', () => {
    // given
    const selectedItems: ItemQuantity = {
      id: 1,
      quantity: 2,
    };

    const { result } = renderHook(() => useRecoilState(itemQuantityState), {
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
