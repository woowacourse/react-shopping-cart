import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'mocks/handlers';
import { mockCartList } from 'fixture';
import { getCartListAsync } from '../cartList.thunks';
import * as actions from 'reducers/cartList/cartList.actions';
import { API_PATH } from 'constants/path';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(...handlers);

describe('thunk를 이용하여 외부 API에 잘 연동되는지 확인한다.', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('1. 장바구니 목록 정보를 불러오는 데 성공하면 장바구니 목록 정보와 함께 GET_CART_LIST_SUCCESS 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.CART_LIST, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockCartList));
      }),
    );

    await getCartListAsync(mockDispatch);

    expect(mockDispatch).toBeCalledWith(
      actions.getCartListSuccess(mockCartList),
    );
  });

  test('2. 장바구니 목록 정보를 불러오는 데 실패하면 GET_CART_LIST_ERROR 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.CART_LIST, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getCartListAsync(mockDispatch);

    expect(mockDispatch).toBeCalledWith(actions.getCartListError());
  });
});
