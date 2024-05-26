import { act } from 'react';

import { RecoilRoot } from 'recoil';

import { renderHook, waitFor } from '@testing-library/react';

import { useSelectedCartItemIdList } from './useSelectedCartItemIdList';
import {
  cartItemListState,
  selectedCartItemIdListState,
} from '../../recoil/cartItem/atom';

describe('useSelectedCartItemIdList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

  it('selectedIdList는 저장된 "선택된 카트 아이템 id 목록" 상태와 같은 값을 불러와야 한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
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
    expect(result.current.selectedIdList).toStrictEqual([
      MOCK_CART_ITEMS[0].id,
    ]);
  });

  it('selectAll은 모든 카트 아이템 id를 선택해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEMS);
            set(selectedCartItemIdListState, []);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    act(() => result.current.selectAll());
    expect(result.current.selectedIdList).toStrictEqual(
      MOCK_CART_ITEMS.map(({ id }) => id),
    );
  });

  it('unselectAll은 모든 카트 아이템 id를 선택 해제해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
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
    act(() => result.current.unselectAll());
    expect(result.current.selectedIdList).toStrictEqual([]);
  });

  it('isSelectedAll은 모든 카트 아이템 id가 선택되어 있을 때 true를 반환한다.', async () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, MOCK_CART_ITEMS);
            set(selectedCartItemIdListState, []);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => result.current.selectAll());
    expect(await waitFor(() => result.current.isSelectedAll)).toBe(true);
  });

  it('isSelectedAll은 카트 아이템 id가 하나라도 선택되어있지 않을 때 false 반환한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
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

    act(() => result.current.unselectAll());
    expect(result.current.isSelectedAll).toBe(false);
  });

  it('selectedCartItemIdList 상태가 변경될 때 마다 localStorage에 상태를 저장해야 한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListState, [MOCK_CART_ITEMS[0].id]);
            set(cartItemListState, MOCK_CART_ITEMS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    act(() => {
      result.current.selectAll();
    });
    const firstValue = JSON.parse(
      localStorage.getItem('selectedCartItemIdListState') || '[]',
    );
    expect(firstValue).toStrictEqual(MOCK_CART_ITEMS.map(({ id }) => id));
    act(() => {
      result.current.unselectAll();
    });
    const secondValue = JSON.parse(
      localStorage.getItem('selectedCartItemIdListState') || '[]',
    );
    expect(secondValue).toStrictEqual([]);
  });

  it('selectedCartItemIdList는 localStorage에서 상태를 불러와야 한다.', () => {
    localStorage.setItem(
      'selectedCartItemIdListState',
      JSON.stringify([MOCK_CART_ITEMS[0].id]),
    );

    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.selectedIdList).toStrictEqual([
      MOCK_CART_ITEMS[0].id,
    ]);
  });
});
