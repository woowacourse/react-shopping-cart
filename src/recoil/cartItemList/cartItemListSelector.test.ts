import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
  requestCartItemList: jest.fn(),
}));

const MOCK_PRODUCT1 = {
  id: 3,
  name: '아디다스',
  price: 2000,
  imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
  category: 'fashion',
};

const MOCK_CART_ITEM1: CartItem = {
  product: MOCK_PRODUCT1,
  quantity: 5,
  id: 1,
};

const MOCK_PRODUCT2 = {
  id: 4,
  name: '아디다스2',
  price: 3000,
  imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
  category: 'fashion',
};

const MOCK_CART_ITEM2: CartItem = {
  product: MOCK_PRODUCT2,
  quantity: 2,
  id: 2,
};

const MOCK_CART_LIST = [MOCK_CART_ITEM1, MOCK_CART_ITEM2];

describe('cartItemListState test', () => {
  beforeEach(() => {
    const { requestCartItemList } = require('../../apis/cartItemList/cartItemList');
    requestCartItemList.mockResolvedValue(MOCK_CART_LIST);
  });

  test('cartItemListState의 초기 값은 빈 배열이어야 한다', () => {
    const { result } = renderHook(() => useRecoilValue(cartItemListState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual([]);
  });

  test('cartItemListQuery가 API 호출 후 올바른 데이터를 반환해야 한다', async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemListQuery), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => expect(result.current).toEqual(MOCK_CART_LIST));
  });

  test('cartItemListState를 업데이트하면 cartItemState상태가 변경되어야 한다', async () => {
    const { result } = renderHook(
      () => {
        const setCartItems = useSetRecoilState(cartItemListState);
        const cartItems = useRecoilValue(cartItemListState);
        return { setCartItems, cartItems };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setCartItems(MOCK_CART_LIST);
    });

    await waitFor(() => expect(result.current.cartItems).toEqual(MOCK_CART_LIST));
  });
});
