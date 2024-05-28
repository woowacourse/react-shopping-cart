import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useSelectedCartItemList from './useSelectedCartItemList';
import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';

describe('useSelectedCartItemList', () => {
  const MOCK_CART_ITEMS = [
    {
      id: 2463,
      quantity: 2,
      name: '코카콜라',
      price: 10000,
      imageUrl:
        'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
    },
    {
      id: 2464,
      quantity: 3,
      name: '나이키',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    },
  ];

  it('selectedCartItemList는 저장된 "선택된 카트 아이템" 상태를 반환해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEMS);
            set(selectedCartItemIdListState, [MOCK_CART_ITEMS[0].id]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.selectedCartItemList).toEqual([MOCK_CART_ITEMS[0]]);
  });

  it('totalProducts는 선택된 카트 아이템 종류의 갯수를 반환해야 한다..', () => {
    const { result } = renderHook(() => useSelectedCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEMS);
            set(selectedCartItemIdListState, [MOCK_CART_ITEMS[0].id]);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.totalProducts).toBe(
      result.current.selectedCartItemList.length,
    );
  });

  it('totalQuantity는 선택된 카트 아이템의 총 갯수를 반환해야 한다..', () => {
    const { result } = renderHook(() => useSelectedCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEMS);
            set(
              selectedCartItemIdListState,
              MOCK_CART_ITEMS.map(({ id }) => id),
            );
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.totalQuantity).toBe(
      result.current.selectedCartItemList.reduce(
        (sum, { quantity }) => sum + quantity,
        0,
      ),
    );
  });
});
