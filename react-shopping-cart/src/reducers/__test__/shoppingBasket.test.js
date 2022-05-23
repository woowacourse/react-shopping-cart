import shoppingBasket from '../shoppingBasket';
import {
  addShoppingBasketProduct,
  deleteShoppingBasketProduct,
  increaseShoppingBasketProduct,
  decreaseShoppingBasketProduct,
} from 'actions/shoppingBasket';

const PRODUCT = {
  id: 1,
  thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
  name: '[든든] 서버산 고기',
  price: 6390,
};

describe('Action에 맞게 shoppingBasket에 상태가 변경된다.', () => {
  test('상품 추가 요청이 들어오면 해당 상품 정보가 추가된다.', () => {
    const INITIAL_STATE = {
      shoppingBasketList: [],
    };

    const reducerState = shoppingBasket(INITIAL_STATE, addShoppingBasketProduct(PRODUCT));

    expect(reducerState).toEqual({
      shoppingBasketList: [
        {
          ...PRODUCT,
          quantity: 1,
        },
      ],
    });
  });

  test('상품 삭제 요청이 들어오면 해당 상품 정보가 삭제된다.', () => {
    const INITIAL_STATE = {
      shoppingBasketList: [{ ...PRODUCT, quantity: 1 }],
    };

    const reducerState = shoppingBasket(INITIAL_STATE, deleteShoppingBasketProduct([1]));

    expect(reducerState).toEqual({
      shoppingBasketList: [],
    });
  });

  test('상품 개수 증가 요청이 들어오면 해당 상품 개수 정보가 증가한다.', () => {
    const INITIAL_STATE = {
      shoppingBasketList: [{ ...PRODUCT, quantity: 1 }],
    };

    const reducerState = shoppingBasket(INITIAL_STATE, increaseShoppingBasketProduct(1));

    expect(reducerState).toEqual({
      shoppingBasketList: [{ ...PRODUCT, quantity: 2 }],
    });
  });

  test('상품 개수 감소 요청이 들어오면 해당 상품 개수 정보가 감소한다.', () => {
    const INITIAL_STATE = {
      shoppingBasketList: [{ ...PRODUCT, quantity: 1 }],
    };

    const reducerState = shoppingBasket(INITIAL_STATE, decreaseShoppingBasketProduct(1));

    expect(reducerState).toEqual({
      shoppingBasketList: [{ ...PRODUCT, quantity: 0 }],
    });
  });
});
