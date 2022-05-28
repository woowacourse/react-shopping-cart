import { actionTypes } from '../store/cart/cart.actions';
import cartReducer from '../store/cart/cart.reducer';

const cartList = [
  {
    id: 1,
    name: '아이스컵 92파이 16온스',
    price: '51000',
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
    category: 'beverage',
  },
  {
    id: 2,
    name: '캔시머 페트캔(500ml)',
    price: '30500',
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/dbcb4df8-f202-4388-9d8b-b6f33b05f129.jpg',
    category: 'beverage',
  },
];

describe('장바구니 action 테스트', () => {
  const initialState = {
    data: [],
    isLoading: false,
    isError: false,
  };

  test('장바구니 관련 요청 액션이 들어오면, 대기 상태가 된다.', () => {
    expect(cartReducer(initialState, { type: actionTypes.ADD_CART })).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('장바구니 관련 성공 액션이 들어오면, 이행 상태가 된다.', () => {
    expect(
      cartReducer(initialState, { type: actionTypes.ADD_CART_SUCCESS, payload: cartList })
    ).toEqual({
      ...initialState,
      data: cartList,
      isLoading: false,
    });
  });

  test('장바구니 관련 실패 액션이 들어오면, 실패 상태가 된다.', () => {
    expect(cartReducer(initialState, { type: actionTypes.ADD_CART_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
