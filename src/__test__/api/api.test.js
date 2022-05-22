import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {getProductList, GET_PRODUCT_LIST} from 'store/modules/productList';

import {getCartList, GET_CART} from 'store/modules/cart';

import {MOCK_PRODUCT_LIST} from 'mocks/mockData';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(
  rest.get(process.env.REACT_APP_PRODUCT_API_URL, (req, res, ctx) => {
    return res(ctx.json(MOCK_PRODUCT_LIST));
  }),

  rest.get(process.env.REACT_APP_CART_API_URL, (req, res, ctx) => {
    return res(ctx.json(MOCK_PRODUCT_LIST[0]));
  }),
);

describe('외부 API를 테스트한다.', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('상품 목록 API Get 요청 성공 시 SUCCESS 액션이 dispatch 된다.', async () => {
    await getProductList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: GET_PRODUCT_LIST.SUCCESS,
      payload: MOCK_PRODUCT_LIST,
    });
  });

  test('장바구니 API Get 요청 성공 시 SUCCESS 액션이 dispatch 된다.', async () => {
    await getCartList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: GET_CART.SUCCESS,
      payload: MOCK_PRODUCT_LIST[0],
    });
  });
});
