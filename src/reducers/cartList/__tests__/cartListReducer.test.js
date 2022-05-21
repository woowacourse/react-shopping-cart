import { mockCartList } from 'fixture';
import cartListReducer from 'reducers/cartList/cartList.reducer';
import * as actions from 'reducers/cartList/cartList.actions';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('장바구니 목록 요청이 들어오면 해당 장바구니 목록을 정상적으로 장바구니 목록 상태에 추가해야 한다.', () => {
    const initialCartList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedCartList = {
      data: mockCartList,
      isLoading: false,
      isError: false,
    };

    expect(
      cartListReducer(
        initialCartList,
        actions.getCartListSuccess(mockCartList),
      ),
    ).toEqual(expectedCartList);
  });
});
