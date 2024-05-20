import { renderHook } from '@testing-library/react';
import { act } from 'react';
import {
  RecoilRoot,
  atom,
  atomFamily,
  selector,
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
      price: 100000,
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

const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});

const allCartItemsCheckState = selector<boolean>({
  key: 'allCartItemsCheckState',
  get: ({ get }) => {
    const cart = get(cartData);
    return cart.every((cartItem) => get(cartItemCheckState(cartItem.id)));
  },
  set: ({ set, get }, newValue) => {
    const cart = get(cartData);
    cart.forEach((cartItem) => {
      set(cartItemCheckState(cartItem.id), newValue);
    });
  },
});

describe('allCartItemsCheckState', () => {
  it('모든 체크 박스를 활성화 시킨다.', () => {
    const { result } = renderHook(
      () => useRecoilState(allCartItemsCheckState),
      {
        wrapper: RecoilRoot,
      },
    );

    const [isAllCheck, setIsAllCheck] = result.current;

    act(() => {
      setIsAllCheck(!isAllCheck);
    });

    expect(result.current[0]).toBe(!isAllCheck);
  });
});

const checkedCartItems = selector({
  key: 'checkedCartItems',
  get: ({ get }) => {
    const cart = get(cartData);
    const isCheckedCartItems = cart.filter((cartItem) =>
      get(cartItemCheckState(cartItem.id)),
    );
    return isCheckedCartItems;
  },
});

describe('checkedCartItems', () => {
  it('선택된 상품들의 정보만 반환한다.', () => {
    const itemId = 222;

    const mockCartItemCheckStateAtom = atomFamily<boolean, number>({
      key: 'cartItemCheckState',
      default: (id) => id === itemId,
    });

    const { result: checked } = renderHook(
      () => useRecoilState(mockCartItemCheckStateAtom(itemId)),
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      const [, setIsChecked] = checked.current;
      setIsChecked(true);
    });

    const { result } = renderHook(() => useRecoilValue(checkedCartItems), {
      wrapper: RecoilRoot,
    });

    expect(result.current.length).toBe(1);
    expect(result.current[0].id).toBe(itemId);
  });
});

const calculateOrderPrice = selector<Price>({
  key: 'calculateOrderPrice',
  get: ({ get }) => {
    const checkedCart = get(checkedCartItems);
    const totalOrderPrice = checkedCart.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
    const deliveryFee =
      totalOrderPrice >= 100000 || totalOrderPrice === 0 ? 0 : 3000;
    const totalPrice = totalOrderPrice + deliveryFee;

    return { totalOrderPrice, deliveryFee, totalPrice };
  },
});

const checkingCartItem = (itemId: number) => {
  const mockCartItemCheckStateAtom = atomFamily<boolean, number>({
    key: 'cartItemCheckState',
    default: (id) => id === itemId,
  });

  const { result: checked } = renderHook(
    () => useRecoilState(mockCartItemCheckStateAtom(itemId)),
    {
      wrapper: RecoilRoot,
    },
  );

  act(() => {
    const [, setIsChecked] = checked.current;
    setIsChecked(true);
  });
};

describe('calculateOrderPrice', () => {
  checkingCartItem(222);

  it('상품 금액 계산: 선택된 상품들의 가격 합계가 올바르게 계산한다.', () => {
    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: RecoilRoot,
    });
    expect(result.current.totalOrderPrice).toBe(40000);
  });

  it('배송비 계산: 상품 금액이 10만원 이하일 경우, 배송비는 3,000원이다.', () => {
    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: RecoilRoot,
    });
    expect(result.current.deliveryFee).toBe(3000);
  });

  it('배송비 계산: 상품 금액이 10만원 이상일 경우, 배송비는 0원이다.', () => {
    checkingCartItem(111);

    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: RecoilRoot,
    });
    expect(result.current.deliveryFee).toBe(0);
  });

  it('총 결제 금액 계산: 상품 금액과 배송비를 합친 금액을 올바르게 계산한다..', () => {
    const { result } = renderHook(() => useRecoilValue(calculateOrderPrice), {
      wrapper: RecoilRoot,
    });
    expect(result.current.totalPrice).toBe(140000);
  });
});
