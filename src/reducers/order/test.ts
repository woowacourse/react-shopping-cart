import orderReducer, { initialState } from '.';
import actions from '../../actions';
import { OrderList } from '../../interface';

describe('orderReducer test', () => {
  it('should handle orderList/get/success', () => {
    expect(orderReducer(initialState, actions.order.post.success())).toEqual({
      ...initialState,
      requestErrorMessage: null,
    });
  });

  it('should handle orderList/get/failure', () => {
    const requestErrorMessage = { requestErrorMessage: '요청에 실패했습니다.' };

    expect(
      orderReducer(
        initialState,
        actions.order.post.failure(requestErrorMessage)
      )
    ).toEqual({ ...initialState, ...requestErrorMessage });
  });
});
