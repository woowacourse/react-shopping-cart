import cartReducer, { initialState } from 'reducers/cart/cart.reducer';
import * as actions from 'reducers/cart/cart.actions';
import { productList } from 'assets/mock';

describe('장바구니 불러오기 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 장바구니 불러오기 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.getCartRequest())).toEqual({
      ...initialState,
      isLoadingGetCart: true,
      isSucceedGetCart: false,
      isErrorGetCart: false,
    });
  });

  test('(SUCCESS) 장바구니 불러오기 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      cartReducer(initialState, actions.getCartSuccess(productList)),
    ).toEqual({
      ...initialState,
      data: productList,
      isLoadingGetCart: false,
      isSucceedGetCart: true,
      isErrorGetCart: false,
    });
  });

  test('(ERROR) 장바구니 불러오기 요청이 실패하면 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.getCartError())).toEqual({
      ...initialState,
      isLoadingGetCart: false,
      isSucceedGetCart: false,
      isErrorGetCart: true,
    });
  });
});

describe('장바구니 아이템 추가 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 장바구니 아이템 추가 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.addCartItemRequest())).toEqual({
      ...initialState,
      isLoadingAddCartItem: true,
      isSucceedAddCartItem: false,
      isErrorAddCartItem: false,
    });
  });

  test('(SUCCESS) 장바구니 아이템 추가 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    const data = productList[0];
    expect(cartReducer(initialState, actions.addCartItemSuccess(data))).toEqual(
      {
        ...initialState,
        data,
        isLoadingAddCartItem: false,
        isSucceedAddCartItem: true,
        isErrorAddCartItem: false,
      },
    );
  });

  test('(ERROR) 장바구니 아이템 추가 요청이 실패, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.addCartItemError())).toEqual({
      ...initialState,
      isLoadingAddCartItem: false,
      isSucceedAddCartItem: false,
      isErrorAddCartItem: true,
    });
  });
});

describe('장바구니 아이템 수량 변경 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 장바구니 아이템 수량 변경 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      cartReducer(initialState, actions.updateCartItemQuantityRequest()),
    ).toEqual({
      ...initialState,
      isLoadingUpdateCartItemQuantity: true,
      isErrorUpdateCartItemQuantity: false,
    });
  });

  test('(SUCCESS) 장바구니 아이템 수량 변경 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      cartReducer(
        initialState,
        actions.updateCartItemQuantitySuccess(productList),
      ),
    ).toEqual({
      ...initialState,
      data: productList,
      isLoadingUpdateCartItemQuantity: false,
      isErrorUpdateCartItemQuantity: false,
    });
  });

  test('(ERROR) 장바구니 아이템 추가 요청이 실패, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      cartReducer(initialState, actions.updateCartItemQuantityError()),
    ).toEqual({
      ...initialState,
      isLoadingUpdateCartItemQuantity: false,
      isErrorUpdateCartItemQuantity: true,
    });
  });
});

describe('장바구니 아이템 삭제 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 장바구니 아이템 삭제 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.deleteCartItemRequest())).toEqual({
      ...initialState,
      isLoadingDeleteCartItem: true,
      isErrorDeleteCartItem: false,
    });
  });

  test('(SUCCESS) 장바구니 아이템 삭제 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    const data = productList;
    expect(
      cartReducer(initialState, actions.deleteCartItemSuccess(data)),
    ).toEqual({
      ...initialState,
      data,
      isLoadingDeleteCartItem: false,
      isErrorDeleteCartItem: false,
    });
  });

  test('(ERROR) 장바구니 아이템 삭제 요청이 실패하면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(cartReducer(initialState, actions.deleteCartItemError())).toEqual({
      ...initialState,
      isLoadingDeleteCartItem: false,
      isErrorDeleteCartItem: true,
    });
  });
});
