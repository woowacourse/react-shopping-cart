import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'mocks/handlers';
import { mockProductList } from 'fixture';
import { getProductListAsync } from 'reducers/productList/productList.thunks';
import * as actions from 'reducers/productList/productList.actions';

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

  test('1. 상품 목록 정보를 불러오는 데 성공하면 상품 목록 정보와 함께 GET_PRODUCT_LIST_SUCCESS 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get('/productList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProductList));
      }),
    );

    await getProductListAsync(mockDispatch);

    expect(mockDispatch).toBeCalledWith(
      actions.getProductListSuccess(mockProductList),
    );
  });

  test('2. 상품 목록 정보를 불러오는 데 실패하면 GET_PRODUCT_LIST_ERROR 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get('/productList', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getProductListAsync(mockDispatch);

    expect(mockDispatch).toBeCalledWith(actions.getProductListError());
  });
});
