import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { mockCartItemsData } from '../../mocks/mockCartItemsData';
import { mockChangeCountData } from '../../mocks/mockChangeCountData';
import { mockSelectedItemsData } from '../../mocks/mockSelectedItemsData';
import {
  cartItemsCountState,
  cartItemsState,
  isAllSelectedState,
  selectedItemsState,
} from './atoms';

describe('초기값 테스트', () => {
  it('상품 목록 조회 초기값은 빈 배열이다.', () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual([]);
  });

  it('상품 총 수량 초기값은 0이다. ', () => {
    const { result } = renderHook(() => useRecoilState(cartItemsCountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toBe(0);
  });
});

describe('mockData를 이용한 테스트', () => {
  it('장바구니 데이터 로딩 ', () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCartItemsData.content));

    expect(result.current[0].length).toBe(3);
  });

  it('개별 상품 선택 기능', () => {
    const { result } = renderHook(() => useRecoilState(selectedItemsState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockSelectedItemsData.selectedItemsState));

    const selectedCount = Object.values(result.current[0]).filter(
      (value) => value === true,
    ).length;

    const unselectedCount = Object.values(result.current[0]).filter(
      (value) => value === false,
    ).length;

    expect(selectedCount).toBe(3);
    expect(unselectedCount).toBe(1);
  });

  it('전체 상품 선택 기능', () => {
    const { result } = renderHook(() => useRecoilState(isAllSelectedState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockSelectedItemsData.isAllSelectedState));

    expect(result.current[0]).toBe(false);
  });

  it('수량 증가 기능', () => {
    const { result } = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsState);
        const cartItemsCount = useRecoilValue(cartItemsCountState);
        return { cartItems, setCartItems, cartItemsCount };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setCartItems(
        mockChangeCountData.content.map((item) => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            category: item.product.category,
          },
          quantity: item.quantity,
        })),
      );
    });

    act(() => {
      result.current.setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === 429 ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    });

    const expectedCount = result.current.cartItems.find(
      (item) => item.id === 429,
    );

    if (expectedCount) {
      expect(expectedCount.quantity).toBe(2);
    }
  });
});
