import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'mocks/handlers';
import { mockOrderList } from 'fixture';
import { getOrderListAsync } from '../orderList.thunks';
import { API_PATH } from 'constants/path';
import {
  GET_ORDER_LIST_ERROR,
  GET_ORDER_LIST_SUCCESS,
} from '../orderList.reducer';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(...handlers);

describe('thunk를 이용하여 외부 API에 잘 연동되는지 확인한다.', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('1. 주문 목록 정보를 불러오는 데 성공하면 주문 목록 정보와 함께 GET_ORDER_LIST_SUCCESS 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.ORDER_LIST, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockOrderList));
      }),
    );

    await getOrderListAsync()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: GET_ORDER_LIST_SUCCESS,
      data: mockOrderList,
    });
  });

  test('2. 주문 목록 정보를 불러오는 데 실패하면 GET_ORDER_LIST_ERROR 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.ORDER_LIST, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getOrderListAsync()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: GET_ORDER_LIST_ERROR,
    });
  });
});
