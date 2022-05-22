import { cartListAction } from 'redux/cartList/action';
import { cartListReducer, CartListState } from 'redux/cartList/reducer';

const initialState: CartListState = {
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
    const stateWithOneItem = cartListReducer(
      initialState,
      cartListAction.postCartItemSuccess(cartItem)
    );
    const stateWithTwoItem = cartListReducer(
      stateWithOneItem,
      cartListAction.postCartItemSuccess(cartItem2)
    );

    expect(cartListReducer(stateWithTwoItem, cartListAction.deleteAllCartItemSuccess())).toEqual({
      ...initialState,
      data: [],
    });
  });

  test('장바구니 선택 해제', () => {
    const prevState = cartListReducer(initialState, cartListAction.postCartItemSuccess(cartItem));

    const changedCartItem = {
      ...cartItem,
      isSelected: !cartItem.isSelected,
    };

    expect(
      cartListReducer(prevState, cartListAction.patchCartSelectedSuccess(changedCartItem))
    ).toEqual({
      ...initialState,
      data: [changedCartItem],
    });
  });

  test('장바구니 전체 선택 해제 ', () => {
    const stateWithOneItem = cartListReducer(
      initialState,
      cartListAction.postCartItemSuccess(cartItem)
    );
    const stateWithTwoItem = cartListReducer(
      stateWithOneItem,
      cartListAction.postCartItemSuccess(cartItem2)
    );

    const isAllSelected = stateWithTwoItem.data.every(item => item.isSelected);
    const newCartList = stateWithTwoItem.data.map(item => ({
      ...item,
      isSelected: !isAllSelected,
    }));

    expect(
      cartListReducer(stateWithTwoItem, cartListAction.patchAllCartSelectedSuccess(!isAllSelected))
    ).toEqual({
      ...initialState,
      data: newCartList,
    });
  });
});
