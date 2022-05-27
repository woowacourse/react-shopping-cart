import { cartListActions } from 'redux/cartList/action';
import { cartListReducer, initialState } from 'redux/cartList/reducer';

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
    expect(
      cartListReducer(initialState, cartListActions.postCartItemActionGroup.success(cartItem))
    ).toEqual({
      ...initialState,
      data: [cartItem],
    });
  });

  test('장바구니 개수 수정', () => {
    const prevState = cartListReducer(
      initialState,
      cartListActions.postCartItemActionGroup.success(cartItem)
    );

    const addedCartItem = {
      ...cartItem,
      quantity: 3,
    };

    expect(
      cartListReducer(prevState, cartListActions.putCartItemActionGroup.success(addedCartItem))
    ).toEqual({
      ...initialState,
      data: [addedCartItem],
    });
  });

  test('장바구니 삭제', () => {
    const prevState = cartListReducer(
      initialState,
      cartListActions.postCartItemActionGroup.success(cartItem)
    );

    expect(
      cartListReducer(prevState, cartListActions.deleteCartItemActionGroup.success(cartItem.id))
    ).toEqual({
      ...initialState,
      data: [],
    });
  });

  test('장바구니 전체 삭제 ', () => {
    const stateWithOneItem = cartListReducer(
      initialState,
      cartListActions.postCartItemActionGroup.success(cartItem)
    );
    const stateWithTwoItem = cartListReducer(
      stateWithOneItem,
      cartListActions.postCartItemActionGroup.success(cartItem2)
    );

    expect(
      cartListReducer(stateWithTwoItem, cartListActions.deleteAllCartItemActionGroup.success())
    ).toEqual({
      ...initialState,
      data: [],
    });
  });

  test('장바구니 선택 해제', () => {
    const prevState = cartListReducer(
      initialState,
      cartListActions.postCartItemActionGroup.success(cartItem)
    );

    const changedCartItem = {
      ...cartItem,
      isSelected: !cartItem.isSelected,
    };

    expect(
      cartListReducer(
        prevState,
        cartListActions.patchCartSelectedActionGroup.success(changedCartItem)
      )
    ).toEqual({
      ...initialState,
      data: [changedCartItem],
    });
  });

  test('장바구니 전체 선택 해제 ', () => {
    const stateWithOneItem = cartListReducer(
      initialState,
      cartListActions.postCartItemActionGroup.success(cartItem)
    );
    const stateWithTwoItem = cartListReducer(
      stateWithOneItem,
      cartListActions.postCartItemActionGroup.success(cartItem2)
    );

    const isAllSelected = stateWithTwoItem.data.every(item => item.isSelected);
    const newCartList = stateWithTwoItem.data.map(item => ({
      ...item,
      isSelected: !isAllSelected,
    }));

    expect(
      cartListReducer(
        stateWithTwoItem,
        cartListActions.patchAllCartSelectedActionGroup.success(!isAllSelected)
      )
    ).toEqual({
      ...initialState,
      data: newCartList,
    });
  });
});
