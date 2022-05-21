import { mockProduct, mockProductList } from 'fixture';
import { handlers } from 'mocks/handlers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import httpMocks from 'node-mocks-http';
import { getProductAsync } from 'reducers/product/product.thunks';
import * as actions from 'reducers/product/product.actions';
import { API_PATH } from 'constants/path';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(...handlers);

describe('thunk를 이용하여 외부 API에 잘 연동되는지 확인한다.', () => {
  let req;

  beforeAll(() => {
    server.listen();
    req = httpMocks.createRequest;
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('1. 상품 정보를 불러오는 데 성공하면 상품 정보와 함께 GET_PRODUCT_SUCCESS 액션이 dispatch 되어야 한다.', async () => {
    req.params = { id: '5' };

    server.use(
      rest.get(API_PATH.PRODUCT_LIST_ID, (req, res, ctx) => {
        const { id } = req.params;
        const product = mockProductList.find((product) => product.id === +id);
        return res(ctx.status(200), ctx.json(product));
      }),
    );

    await getProductAsync(req.params.id)(mockDispatch);

    expect(mockDispatch).toBeCalledWith(actions.getProductSuccess(mockProduct));
  });

  test('2. 상품 정보를 불러오는 데 실패하면 GET_PRODUCT_ERROR 액션이 dispatch 되어야 한다.', async () => {
    req.params = { id: '5' };

    server.use(
      rest.get(API_PATH.PRODUCT_LIST_ID, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getProductAsync(req.params.id)(mockDispatch);

    expect(mockDispatch).toBeCalledWith(actions.getProductError());
  });
});
