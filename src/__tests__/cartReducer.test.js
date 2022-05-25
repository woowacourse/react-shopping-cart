import cartReducer, { initialState } from 'reducers/cart/cart.reducer';
import * as actions from 'reducers/cart/cart.actions';
import { productList } from 'assets/mock';

describe('Cart Store Reducer 테스트 - 리듀서 함수의 매개변수 액션에 따라서 변경된 상태를 반환한다.', () => {
  test('(REQUEST) 장바구니 불러오기 요청 액션이 들어오면, api 요청 Pending 이 상태에 반영된다.', () => {
    expect(cartReducer(initialState, actions.getCartRequest())).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('(SUCCESS) 장바구니 불러오기 성공 액션이 들어오면, 매개변수로 받아온 장바구니 리스트가 상태의 data에 저장되고,api 요청 fulfilled 이 상태에 반영된다.', () => {
    expect(
      cartReducer(initialState, actions.getCartSuccess(productList)),
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      data: productList,
    });
  });

  test('(ERROR) 장바구니 불러오기 실패 액션이 들어오면, api 요청 rejected 이 상태에 반영된다.', () => {
    expect(cartReducer(initialState, actions.getCartError())).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  test('장바구니 상품 교체 액션이 들어오면, 매개변수로 받아온 장바구니 리스트가 상태의 data에 저장된다.', () => {
    expect(cartReducer(initialState, actions.setCart(productList))).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      data: productList,
    });
  });
});
