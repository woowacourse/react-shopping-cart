import { CART_ACTION_TYPES } from 'store/action/cartActions';
import cartReducer from './cartReducer';

describe('장바구니 상품 저장상태 테스트', () => {
  let cartedProductsState = [];
  const reducer = action => {
    cartedProductsState = cartReducer(cartedProductsState, action);
  };

  beforeEach(() => {
    cartedProductsState = [];
  });

  const product = {
    id: 1,
    image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
    name: '사과',
    price: 2000,
    count: 1,
    checked: true,
  };

  test('상품 추가 요청이 들어오면 상품을 장바구니 상태에 추가할 수 있다.', () => {
    reducer({
      type: CART_ACTION_TYPES.ADD_PRODUCT,
      payload: {
        product,
      },
    });

    expect(cartedProductsState[0]).toEqual(product);
  });

  test('상품 개수 감소 요청이 들어오면 장바구니에 해당 상품의 개수를 감소시킬 수 있다.', () => {
    reducer({
      type: CART_ACTION_TYPES.ADD_PRODUCT,
      payload: {
        product,
      },
    });

    reducer({
      type: CART_ACTION_TYPES.ADD_PRODUCT,
      payload: {
        product,
      },
    });

    reducer({
      type: CART_ACTION_TYPES.SUBTRACT_PRODUCT,
      payload: {
        product,
      },
    });

    expect(cartedProductsState[0].count).toEqual(1);
  });

  test('해당 상품 클릭 요청이 들어오면 장바구니에 해당 상품을 클릭 상태를 변경할 수 있다.', () => {
    reducer({
      type: CART_ACTION_TYPES.ADD_PRODUCT,
      payload: {
        product,
      },
    });

    reducer({
      type: CART_ACTION_TYPES.CHECK_PRODUCT,
      payload: {
        product: {
          ...product,
        },
        checked: false,
      },
    });

    expect(cartedProductsState[0]).toEqual({ ...product, checked: false });
  });

  test('장바구니 상품 삭제 요청이 들어오면 해당하는 상품을 삭제할 수 있다.', () => {
    reducer({
      type: CART_ACTION_TYPES.REMOVE_PRODUCT,
      payload: {
        product,
      },
    });

    expect(cartedProductsState.length).toEqual(0);
  });
});
