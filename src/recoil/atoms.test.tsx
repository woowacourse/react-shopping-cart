import { renderHook } from '@testing-library/react';
import { act } from 'react';
import {
  RecoilRoot,
  atom,
  atomFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const fetchCartItem = jest.fn(() => [
  {
    id: 111,
    quantity: 1,
    product: {
      id: 1,
      name: 'Product 1',
      price: 10000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 222,
    quantity: 2,
    product: {
      id: 2,
      name: 'Product 2',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
]);

const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

const removeCartItem = (cartItemId: number, cartData: Cart[]) => {
  const removeFilterCartData = cartData.filter((item) => {
    return item.id !== cartItemId;
  });
  return removeFilterCartData;
};

describe('cartData', () => {
  it('fetchCartItem API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러온다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartData), {
      wrapper: RecoilRoot,
    });

    expect(result.current.length).toBe(2);
  });

  it('장바구니에서 특정 cartItem을 제거하면 값이 정상적으로 업데이트 된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartData), {
      wrapper: RecoilRoot,
    });

    act(() => {
      const updatedCartData = removeCartItem(111, result.current);
      result.current = updatedCartData;
    });

    expect(result.current.length).toBe(1);
  });
});

const getCartCounts = jest.fn(() => 3);

const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

describe('cartQuantity', () => {
  it('장바구니에 담긴 상품의 총 주문 수량을 정상적으로 불러온다.', () => {
    const { result } = renderHook(() => useRecoilValue(cartQuantity), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(3);
  });
});

const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: (itemId: number) => {
    const cartData = fetchCartItem();
    const cartItem = cartData.find((item: Cart) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  },
});

describe('cartItemQuantityState', () => {
  it('개별 cartItem의 수량을 변경하면, 정상적으로 값이 업데이트 된다.', () => {
    const { result } = renderHook(
      () => useRecoilState(cartItemQuantityState(222)),
      {
        wrapper: RecoilRoot,
      },
    );

    const [quantity, setQuantity] = result.current;

    act(() => {
      setQuantity(quantity - 1);
    });

    expect(result.current[0]).toBe(quantity - 1);
  });
});

const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});

describe('cartItemCheckState', () => {
  it('초기값이 false인지 확인한다.', () => {
    const { result } = renderHook(
      () => useRecoilState(cartItemCheckState(111)),
      {
        wrapper: RecoilRoot,
      },
    );
    expect(result.current[0]).toBe(false);
  });
});
