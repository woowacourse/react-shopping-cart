import '@testing-library/jest-dom';
import { ItemListActionType } from 'redux/actions/itemList';
import { itemListReducer, initialState } from '../redux/reducers/itemListReducer';
import { cartListReducer } from 'redux/reducers/cartListReducer';
import { CartListActionType } from 'redux/actions/cartList';

describe('ItemList Reducer', () => {
  test('상품 목록 확인 가능', () => {
    const action = {
      type: ItemListActionType.GET_ITEM_LIST_SUCCESS,
      payload: fakeItemList,
    };

    const acture = itemListReducer(initialState, action).data;

    expect(acture).toEqual(fakeItemList);
  });
});

const fakeItemList = [
  {
    id: 1,
    thumbnailUrl: 'https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000101.png',
    title: '이상해씨씨',
    price: 16000,
  },
  {
    id: 2,
    thumbnailUrl: 'https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000201.png',
    title: '이상해풀',
    price: 2000,
  },
  {
    id: 3,
    thumbnailUrl: 'https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000301.png',
    title: '이상해꽃',
    price: 3000,
  },
];

describe('CartList Reducer', () => {
  const newItem = {
    id: 1,
    quantity: 1,
    willPurchase: true,
  };

  const newItem2 = {
    id: 2,
    quantity: 1,
    willPurchase: false,
  };

  test('장바구니 추가 가능', () => {
    const action = {
      type: CartListActionType.POST_CART_ITEM_SUCCESS,
      payload: newItem,
    };

    const acture = cartListReducer(initialState, action).data;

    expect(acture).toEqual([newItem]);
  });

  test('장바구니 삭제 가능', () => {
    const action = {
      type: CartListActionType.REMOVE_CART_ITEM_SUCCESS,
      payload: newItem,
    };

    const acture = cartListReducer(addItem(newItem), action).data;

    expect(acture).toEqual([]);
  });

  test('장바구니 선택 취소 가능', () => {
    const action = {
      type: CartListActionType.PUT_CART_ITEM_SUCCESS,
      payload: toggleCheckItem(newItem),
    };

    const acture = cartListReducer(addItem(newItem), action).data;

    expect(acture).toEqual([toggleCheckItem(newItem)]);
  });

  test('장바구니 불러오기 가능', () => {
    const currentCart = [newItem, newItem2];

    const action = {
      type: CartListActionType.GET_CART_LIST_SUCCESS,
      payload: currentCart,
    };

    const acture = cartListReducer(initialState, action).data;

    expect(acture).toEqual(currentCart);
  });
});

const addItem = item => {
  return { ...initialState, data: [...initialState.data, item] };
};

const toggleCheckItem = item => {
  return { ...item, willPurchase: !item.willPurchase };
};
