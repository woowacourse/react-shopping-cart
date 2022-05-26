import shoppingCart from 'redux/reducers/shoppingCart.reducer';

describe('장바구니 담기 액션 결과 확인 테스트', () => {
  test('상품 추가 액션이 일어났을 때, 장바구니에 상품이 추가되어야한다.', () => {
    const initialShoppingCartItems = [];
    const newProductID = { id: 1 };
    const addItemAction = {
      type: 'ADD_ITEM',
      payload: { ...newProductID },
    };

    expect(shoppingCart(initialShoppingCartItems, addItemAction)).toEqual([
      {
        ...newProductID,
        quantity: 1,
      },
    ]);
  });

  test('장바구니 상품 삭제 액션이 일어났을 때, 장바구니에서 상품이 삭제되어야한다.', () => {
    const initialShoppingCartItems = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
    ];
    const existProductId = { id: 1 };
    const deleteItemAction = {
      type: 'DELETE_ITEM',
      payload: { ...existProductId },
    };

    expect(shoppingCart(initialShoppingCartItems, deleteItemAction)).toEqual([
      { id: 2, quantity: 2 },
    ]);
  });
});
