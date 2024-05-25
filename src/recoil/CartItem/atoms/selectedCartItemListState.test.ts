import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { selectedCartItemListState } from './selectedCartItemListState';

describe('selectedCartItemListState', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify([])); // Mock returning valid JSON string
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('초기값이 제대로 설정되어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toEqual([]);
  });

  it('값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    const newCartItemList = [
      {
        id: 1578,
        quantity: 5,
        product: {
          id: 12,
          name: '컨버스',
          price: 20000,
          imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
          category: 'fashion',
        },
      },
    ];

    act(() => {
      result.current[1](newCartItemList);
    });

    const [value] = result.current;
    expect(value).toEqual(newCartItemList);
  });

  it('localStorage에 값을 추가하고 삭제할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItemListState), {
      wrapper: RecoilRoot,
    });

    const existingCartItem = {
      id: 1234,
      quantity: 2,
      product: {
        id: 34,
        name: '테스트 상품',
        price: 5000,
        imageUrl: 'https://example.com/test.jpg',
        category: 'test',
      },
    };

    const newCartItemList = [
      existingCartItem,
      {
        id: 1578,
        quantity: 5,
        product: {
          id: 12,
          name: '컨버스',
          price: 20000,
          imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
          category: 'fashion',
        },
      },
    ];

    act(() => {
      result.current[1]([existingCartItem]);
    });

    act(() => {
      result.current[1](newCartItemList);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toEqual(newCartItemList);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'selectedCartItemListState',
      JSON.stringify(newCartItemList),
    );
  });
});
