import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import useCartItemList from './useCartItemList';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
  requestDeleteCartItem: jest.fn(),
  requestCartItemList: jest.fn(),
}));

jest.mock('../cartItem/useCartItemSelectedIdList', () => ({
  useCartItemSelectedIdList: jest.fn(),
}));

jest.mock('../cartItem/useCartItemQuantity', () => ({
  useCartItemQuantity: jest.fn(),
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

describe('useCartItemList hook test', () => {
  beforeEach(() => {
    const { requestCartItemList } = require('../../apis/cartItemList/cartItemList');
    requestCartItemList.mockResolvedValue([MOCK_CART_ITEM1, MOCK_CART_ITEM2]);

    const { useCartItemSelectedIdList } = require('../cartItem/useCartItemSelectedIdList');
    useCartItemSelectedIdList.mockReturnValue({
      removeSelectedId: jest.fn(),
    });

    const { useCartItemQuantity } = require('../cartItem/useCartItemQuantity');
    useCartItemQuantity.mockImplementation(() => ({
      setQuantity: jest.fn(),
    }));
  });

  test('deleteCartItem을 호출하여 아이템을 삭제할 수 있어야 한다', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setCartItemList(MOCK_CART_LIST));

    const { requestDeleteCartItem } = require('../../apis/cartItemList/cartItemList');
    await act(async () => {
      await result.current.deleteCartItem(MOCK_CART_ITEM1.id);
    });

    expect(result.current.cartItemList).toEqual([MOCK_CART_ITEM2]);
    expect(requestDeleteCartItem).toHaveBeenCalledWith(MOCK_CART_ITEM1.id);
  });
});
