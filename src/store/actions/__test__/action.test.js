import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from 'api/constants';
import { changeProductQuantity } from 'mocks/handlers';

import { cartActionType } from 'store/reducers/cart';
import { productActionTypes } from 'store/reducers/product';

import { addToCartAsync, getCartAsync } from 'cart';
import { fetchProductListAsync } from 'product';

import { productList } from 'store/actions/__test__/fixture';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(
  rest.get(`${API_URL}products`, (_, res, ctx) => {
    return res(ctx.json(productList), ctx.set('x-total-count', productList.length));
  }),
  rest.post(`${API_URL}shopping-cart`, (req, res, ctx) => {
    const currentShoppingCart = {};
    const { productId, quantity } = req.body;

    const newCart = changeProductQuantity(currentShoppingCart, productId, quantity);

    return res(ctx.json(newCart));
  }),
);

describe('액션 테스트', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe('상품 액션 테스트', () => {
    test('상품을 불러오는 것에 성공하면 상품 정보와 함께 상품 정보 업데이트 action이 dispatch 되어야 한다.', async () => {
      await fetchProductListAsync()(mockDispatch);

      expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: productActionTypes.START });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: productActionTypes.LIST_FETCH,
        payload: { productList, totalProductCount: String(productList.length) },
      });
    });
  });

  describe('장바구니 액션 테스트', () => {
    const sampleProduct = productList[0];
    const sampleQuantity = 1;

    async function addSampleProductToCart() {
      await addToCartAsync(sampleProduct.id, sampleQuantity)(mockDispatch);

      const expectedCart = {
        [sampleProduct.id]: { productData: sampleProduct, quantity: sampleQuantity },
      };

      return expectedCart;
    }

    test('상품 추가를 성공하면 해당 상품이 추가된 장바구니 정보와 함께 장바구니 갱신 action이 dispatch 되어야 한다.', async () => {
      const expectedCart = await addSampleProductToCart();

      expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: cartActionType.START });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: cartActionType.UPDATE,
        payload: { cart: expectedCart },
      });
    });

    test('장바구니 목록을 불러오기에 성공하면 해당 정보와 함께 장바구니 갱신 action이 dispatch 되어야 한다.', async () => {
      const expectedCart = await addSampleProductToCart();
      await getCartAsync();

      expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: cartActionType.START });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: cartActionType.UPDATE,
        payload: { cart: expectedCart },
      });
    });
  });
});
