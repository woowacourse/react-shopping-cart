import { rest } from 'msw';
import { mockProduct, mockProductList } from 'fixture';
import httpMocks from 'node-mocks-http';
import { server } from 'mocks/server';
import { getProductAsync } from 'reducers/product/product.thunks';
import { API_PATH } from 'constants/path';
import { GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS } from '../product.reducer';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('thunk를 이용하여 외부 API에 잘 연동되는지 확인한다.', () => {
  let req;

  beforeAll(() => {
    req = httpMocks.createRequest;
  });

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

    expect(mockDispatch).toBeCalledWith({
      type: GET_PRODUCT_SUCCESS,
      data: mockProduct,
    });
  });

  test('2. 상품 정보를 불러오는 데 실패하면 GET_PRODUCT_ERROR 액션이 dispatch 되어야 한다.', async () => {
    req.params = { id: '5' };

    server.use(
      rest.get(API_PATH.PRODUCT_LIST_ID, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getProductAsync(req.params.id)(mockDispatch);

    expect(mockDispatch).toBeCalledWith({ type: GET_PRODUCT_ERROR });
  });
});
