import {MOCK_PRODUCT_LIST} from 'mocks/mockData';
import cartReducer, {CART} from 'store/modules/cart';

describe('action에 따른 reducer의 동작을 확인한다.', () => {
  test('상품 추가 요청 시 장바구니에 추가된다.', () => {
    const initialCartItem = {
      pending: false,
      error: false,
      cart: [],
    };
    const addedProduct = MOCK_PRODUCT_LIST[0];
    const expectedCart = [{...addedProduct, quantity: 1}];

    expect(
      cartReducer(initialCartItem, {
        type: CART.ADD,
        payload: {
          ...addedProduct,
          quantity: 1,
        },
      }).cart,
    ).toStrictEqual(expectedCart);
  });

  test('상품 삭제 요청 시 장바구니에서 삭제된다.', () => {
    const initialCartItem = {
      pending: false,
      error: false,
      cart: [{...MOCK_PRODUCT_LIST[0], quantity: 1}],
    };
    const productId = initialCartItem.cart[0].id;

    expect(
      cartReducer(initialCartItem, {
        type: CART.DELETE,
        payload: productId,
      }).cart,
    ).toStrictEqual([]);
  });

  test('수량 증가 요청 시 장바구니 내부 해당 상품 수량이 증가한다.', () => {
    const initialCartItem = {
      pending: false,
      error: false,
      cart: [{...MOCK_PRODUCT_LIST[0], quantity: 1}],
    };
    const productId = initialCartItem.cart[0].id;
    const expectedCart = [
      {...initialCartItem.cart[0], quantity: Number.parseInt(initialCartItem.cart[0].quantity) + 1},
    ];

    expect(
      cartReducer(initialCartItem, {
        type: CART.INCREASE_QUANTITY,
        payload: productId,
      }).cart,
    ).toStrictEqual(expectedCart);
  });

  test('수량 감소 요청 시 장바구니 내부 해당 상품 수량이 감소한다.', () => {
    const initialCartItem = {
      pending: false,
      error: false,
      cart: [{...MOCK_PRODUCT_LIST[0], quantity: 2}],
    };
    const productId = initialCartItem.cart[0].id;
    const expectedCart = [
      {...initialCartItem.cart[0], quantity: Number(initialCartItem.cart[0].quantity) - 1},
    ];

    expect(
      cartReducer(initialCartItem, {
        type: CART.DECREASE_QUANTITY,
        payload: productId,
      }).cart,
    ).toStrictEqual(expectedCart);
  });

  test('이미 수량이 1개라면 수량 감소 요청을 해도 1개로 유지된다.', () => {
    const initialCartItem = {
      pending: false,
      error: false,
      cart: [{...MOCK_PRODUCT_LIST[0], quantity: 1}],
    };
    const productId = initialCartItem.cart[0].id;
    const expectedCart = [{...initialCartItem.cart[0], quantity: 1}];

    expect(
      cartReducer(initialCartItem, {
        type: CART.DECREASE_QUANTITY,
        payload: productId,
      }).cart,
    ).toStrictEqual(expectedCart);
  });
});
