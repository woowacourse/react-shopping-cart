import { rest } from 'msw';
import { server } from 'mocks/server';
import { mockProductList } from 'fixture';
import { getProductListAsync } from 'reducers/productList/productList.thunks';
import { API_PATH } from 'constants/path';
import {
  GET_PRODUCT_LIST_ERROR,
  GET_PRODUCT_LIST_SUCCESS,
} from '../productList.reducer';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('thunk를 이용하여 외부 API에 잘 연동되는지 확인한다.', () => {
  test('1. 상품 목록 정보를 불러오는 데 성공하면 상품 목록 정보와 함께 GET_PRODUCT_LIST_SUCCESS 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.PRODUCT_LIST, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProductList));
      }),
    );

    await getProductListAsync()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: GET_PRODUCT_LIST_SUCCESS,
      data: mockProductList,
    });
  });

  test('2. 상품 목록 정보를 불러오는 데 실패하면 GET_PRODUCT_LIST_ERROR 액션이 dispatch 되어야 한다.', async () => {
    server.use(
      rest.get(API_PATH.PRODUCT_LIST, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await getProductListAsync()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({ type: GET_PRODUCT_LIST_ERROR });
  });
});
