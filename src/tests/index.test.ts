import { cartListAction, CartListActionType } from 'redux/cartList/action';
import { CartItemState, cartListReducer } from 'redux/cartList/reducer';

const initialState: CartItemState = {
  loading_getCartList: false,
  loading_postCartList: false,
  loading_putCartItem: false,
  loading_patchCartSelected: false,
  loading_patchAllCartSelected: false,
  loading_deleteCartItem: false,
  loading_deleteAllCartItem: false,
  error: null,
  data: [],
};

const cartItem = {
  id: 1,
  quantity: 1,
  isSelected: true,
};

const cartItem2 = {
  id: 2,
  quantity: 1,
  isSelected: true,
};

describe('test', () => {
  test('장바구니 담기', () => {
    expect(cartListReducer(initialState, cartListAction.postCartItemSuccess(cartItem))).toEqual({
      ...initialState,
      data: [cartItem],
    });
  });

  test('장바구니 개수 수정', () => {
    const prevState = cartListReducer(initialState, cartListAction.postCartItemSuccess(cartItem));

    const addedCartItem = {
      ...cartItem,
      quantity: 3,
    };

    expect(cartListReducer(prevState, cartListAction.putCartItemSuccess(addedCartItem))).toEqual({
      ...initialState,
      data: [addedCartItem],
    });
  });

  test('장바구니 삭제', () => {
    const prevState = cartListReducer(initialState, cartListAction.postCartItemSuccess(cartItem));

    expect(cartListReducer(prevState, cartListAction.deleteCartItemSuccess(cartItem.id))).toEqual({
      ...initialState,
      data: [],
    });
  });

  test('장바구니 전체 삭제 ', () => {
    const prevState = cartListReducer(initialState, cartListAction.postCartItemSuccess(cartItem));
    const prevState2 = cartListReducer(prevState, cartListAction.postCartItemSuccess(cartItem2));

    expect(cartListReducer(prevState2, cartListAction.deleteAllCartItemSuccess())).toEqual({
      ...initialState,
      data: [],
    });
  });

  test('장바구니 선택 해제', () => {
    // thunk, reducer 코드 수정 후 작성
  });

  test('장바구니 전체 선택 해제 ', () => {
    // thunk, reducer 코드 수정 후 작성
  });
});
