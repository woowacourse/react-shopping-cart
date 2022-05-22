import cartReducer, { ADD_ITEM, DELETE_CHECKED_ITEM, DELETE_ITEM, MINUS_ITEM } from 'modules/cart';

describe('cartReducer 작동 테스트 ', () => {
  test('장바구니 추가 요청을 보냈을 때에 해당 상품의 수량이 1인 채로 cartList에 새롭게 추가된다. ', () => {
    const productId = 2;
    const result = cartReducer({ cartList: [] }, { type: ADD_ITEM, payload: { id: 3 } });
    expect(result).toEqual({
      cartList: [{ id: 3, quantity: 1 }],
    });
  });

  test('이미 장바구니에 있는 상품을 추가하였을 때에, 해당 상품의 수량이 증가된다', () => {
    const existCartList = {
      cartList: [{ id: 3, quantity: 1 }],
    };
    const result = cartReducer(existCartList, { type: ADD_ITEM, payload: { id: 3 } });
    expect(result).toEqual({
      cartList: [{ id: 3, quantity: 2 }],
    });
  });

  test('장바구니에 있는 상품의 수량을 1씩 줄일 수 있다.', () => {
    const existCartList = {
      cartList: [
        { id: 3, quantity: 1 },
        { id: 1, quantity: 2 },
      ],
    };
    const result = cartReducer(existCartList, {
      type: MINUS_ITEM,
      payload: {
        id: 1,
      },
    });
    expect(result).toEqual({
      cartList: [
        { id: 3, quantity: 1 },
        { id: 1, quantity: 1 },
      ],
    });
  });

  test('장바구니에 있는 상품을 삭제할 수 있다', () => {
    const existCartList = {
      cartList: [
        { id: 3, quantity: 1 },
        { id: 1, quantity: 2 },
      ],
    };
    const result = cartReducer(existCartList, {
      type: DELETE_ITEM,
      payload: {
        id: 1,
      },
    });
    expect(result).toEqual({
      cartList: [{ id: 3, quantity: 1 }],
    });
  });

  test('체크된 항목들을 장바구니에서 삭제할 수 있다', () => {
    const existCartList = {
      cartList: [
        { id: 3, quantity: 1 },
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 4, quantity: 4 },
      ],
    };
    const result = cartReducer(existCartList, {
      type: DELETE_CHECKED_ITEM,
      payload: {
        checkedList: [4, 1],
      },
    });
    expect(result).toEqual({
      cartList: [
        { id: 3, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    });
  });
});
