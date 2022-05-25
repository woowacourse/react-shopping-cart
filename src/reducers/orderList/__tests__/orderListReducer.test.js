import { mockOrderList } from 'fixture';
import orderListReducer, {
  GET_ORDER_LIST_SUCCESS,
} from 'reducers/orderList/orderList.reducer';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('주문 목록 요청이 들어오면 해당 주문 목록을 정상적으로 주문 목록 상태에 추가해야 한다.', () => {
    const initialOrderList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedOrderList = {
      data: mockOrderList,
      isLoading: false,
      isError: false,
    };

    expect(
      orderListReducer(initialOrderList, {
        type: GET_ORDER_LIST_SUCCESS,
        data: mockOrderList,
      }),
    ).toEqual(expectedOrderList);
  });
});
