import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { renderHook, act } from '@testing-library/react';
import { cartItemListState } from './cartItemListSelector';
import { cartItemQuantityAtomFamily, cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';
import { totalItemQuantitySelector } from './totalItemQuantitySelector';

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

describe('totalItemQuantitySelector 테스트', () => {
  test('선택된 장바구니 아이템들의 총 수량을 더하여 totalItemQuantitySelector를 계산해야 한다', () => {
    const { result } = renderHook(
      () => {
        const setCartItemList = useSetRecoilState(cartItemListState);
        const setCartItemQuantity = useSetRecoilState(cartItemQuantityAtomFamily(MOCK_CART_ITEM1.id));
        const setCartItemQuantity2 = useSetRecoilState(cartItemQuantityAtomFamily(MOCK_CART_ITEM2.id));
        const setCartItemSelectedIdList = useSetRecoilState(cartItemSelectedIdListAtom);
        const totalItemQuantity = useRecoilValue(totalItemQuantitySelector);

        return {
          setCartItemList,
          setCartItemQuantity,
          setCartItemQuantity2,
          setCartItemSelectedIdList,
          totalItemQuantity,
        };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setCartItemList(MOCK_CART_LIST);
      result.current.setCartItemQuantity(MOCK_CART_ITEM1.quantity);
      result.current.setCartItemQuantity2(MOCK_CART_ITEM2.quantity);
      result.current.setCartItemSelectedIdList([MOCK_CART_ITEM1.id, MOCK_CART_ITEM2.id]);
    });

    expect(result.current.totalItemQuantity).toBe(MOCK_CART_ITEM1.quantity + MOCK_CART_ITEM2.quantity);
  });

  test('선택되지 않은 장바구니 아이템들은 총 수량 totalItemQuantitySelector에 포함되지 않아야 한다', () => {
    const { result } = renderHook(
      () => {
        const setCartItemList = useSetRecoilState(cartItemListState);
        const setCartItemQuantity = useSetRecoilState(cartItemQuantityAtomFamily(MOCK_CART_ITEM1.id));
        const setCartItemQuantity2 = useSetRecoilState(cartItemQuantityAtomFamily(MOCK_CART_ITEM2.id));
        const setCartItemSelectedIdList = useSetRecoilState(cartItemSelectedIdListAtom);
        const totalItemQuantity = useRecoilValue(totalItemQuantitySelector);

        return {
          setCartItemList,
          setCartItemQuantity,
          setCartItemQuantity2,
          setCartItemSelectedIdList,
          totalItemQuantity,
        };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setCartItemList(MOCK_CART_LIST);
      result.current.setCartItemQuantity(MOCK_CART_ITEM1.quantity);
      result.current.setCartItemQuantity2(MOCK_CART_ITEM2.quantity);
      result.current.setCartItemSelectedIdList([MOCK_CART_ITEM1.id]); // id 2는 선택되지 않음
    });

    expect(result.current.totalItemQuantity).toBe(MOCK_CART_ITEM1.quantity);
  });
});
