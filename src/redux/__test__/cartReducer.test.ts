import { CartStoreState, Product } from 'types/index';

import { cartActions } from '../actions';
import cartReducer from '../reducers/cart';
import db from 'db.json';

const product1: Product = db.products[0];
const product2: Product = db.products[1];

const initialState: CartStoreState = {
  cart: [],
};

describe('장바구니 reducer 테스트', () => {
  test('새로운 상품의 추가 요청이 들어오면 해당 상품을 장바구니에 추가해야 한다.', () => {
    const expectedCart = [{ id: product1.id, stock: 1, checked: true }];

    expect(
      cartReducer(initialState, cartActions.addToCart(product1.id))
    ).toEqual({ cart: expectedCart });
  });

  test('이미 장바구니에 들어있는 상품의 추가 요청이 들어오면 해당 상품의 개수를 하나 증가시켜야 한다.', () => {
    // product1이 장바구니에 하나 추가된 상태
    const newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );
    const expectedCart = [{ id: product1.id, stock: 2, checked: true }];

    expect(cartReducer(newState, cartActions.addToCart(product1.id))).toEqual({
      cart: expectedCart,
    });
  });

  test('상품의 삭제 요청이 들어오면 해당 상품을 장바구니에서 삭제해야 한다.', () => {
    // product1이 장바구니에 하나 추가된 상태
    const newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );

    expect(
      cartReducer(newState, cartActions.deleteToCart(product1.id))
    ).toEqual(initialState);
  });

  test('선택된 상품의 삭제 요청이 들어오면 선택된 모든 상품들을 장바구니에서 삭제해야 한다.', () => {
    // product1, product2가 장바구니에 하나씩 추가된 상태
    let newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );
    newState = cartReducer(newState, cartActions.addToCart(product2.id));

    expect(cartReducer(newState, cartActions.deleteCheckedToCart())).toEqual(
      initialState
    );
  });

  test('한 상품의 선택 토글 요청이 들어오면 해당 상품의 선택 여부를 바꿔줘야 한다.', () => {
    // product1이 장바구니에 하나 추가된 상태
    const newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );
    const expectedCart = [{ id: product1.id, stock: 1, checked: false }];

    expect(
      cartReducer(newState, cartActions.toggleCheckAProduct(product1.id))
    ).toEqual({
      cart: expectedCart,
    });
  });

  test('모든 상품의 선택 토글 요청이 들어오면 모든 상품의 선택 여부를 주어진 상태에 맞게 바꿔줘야 한다.', () => {
    // product1, product2가 장바구니에 하나씩 추가된 상태
    let newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );
    newState = cartReducer(newState, cartActions.addToCart(product2.id));

    const expectedAllFalseCart = [
      { id: product1.id, stock: 1, checked: false },
      { id: product2.id, stock: 1, checked: false },
    ];
    const expectedAllTrueCart = [
      { id: product1.id, stock: 1, checked: true },
      { id: product2.id, stock: 1, checked: true },
    ];

    expect(
      cartReducer(newState, cartActions.toggleCheckAllProduct(false))
    ).toEqual({
      cart: expectedAllFalseCart,
    });
    expect(
      cartReducer(newState, cartActions.toggleCheckAllProduct(true))
    ).toEqual({
      cart: expectedAllTrueCart,
    });
  });

  test('상품 수량 변경 요청이 들어오면 해당 상품의 수량을 변경해주어야 한다.', () => {
    // product1이 장바구니에 하나 추가된 상태
    const newState = cartReducer(
      initialState,
      cartActions.addToCart(product1.id)
    );
    const changeStock = 10;
    const expectedCart = [
      { id: product1.id, stock: changeStock, checked: true },
    ];

    expect(
      cartReducer(
        newState,
        cartActions.changeProductStock({ id: product1.id, stock: changeStock })
      )
    ).toEqual({
      cart: expectedCart,
    });
  });
});
