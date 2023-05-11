import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';

import useShoppingCart from '.';

describe('장바구니에 넣은 물품 품목 훅 테스트', () => {
  const exampleProduct = {
    id: 1,
    name: '[간편식] 불고기 도시락',
    price: 10000,
    imageUrl: '#',
  };

  test('초기 장바구니 속 물품의 갯수는 0개', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper: RecoilRoot });

    expect(result.current.shoppingCart.length).toBe(0);
  });

  test('장바구니에 물품정보와 수량을 넣은 경우 장바구니 속 물품 갯수 1개 증가', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper: RecoilRoot });

    act(() => {
      result.current.updateShoppingCart(exampleProduct, 5);
    });

    expect(result.current.shoppingCart.length).toBe(1);
  });

  test('기존에 동일한 물품이 있는 경우 장바구니 속 물품의 수량만 변화하여 물품의 총 갯수는 변동 없음', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper: RecoilRoot });

    act(() => {
      result.current.updateShoppingCart(exampleProduct, 5);
    });

    act(() => {
      result.current.updateShoppingCart(exampleProduct, 1);
    });

    expect(result.current.shoppingCart.length).toBe(1);
  });

  test('수량이 0으로 업데이트 요청을 하는 경우 장바구니에서 물품 삭제', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper: RecoilRoot });

    act(() => {
      result.current.updateShoppingCart(exampleProduct, 5);
    });

    act(() => {
      result.current.updateShoppingCart(exampleProduct, 0);
    });

    expect(result.current.shoppingCart.length).toBe(0);
  });
});
