import { rest } from 'msw';
import cartProducts from 'mocks/fixtures/cartProducts.json';

type ErrorResponse = {
  message: string;
};

type PostReqBody = {
  productId: number;
};

const authorizationError: ErrorResponse = { message: '인증실패' };

export const cart = [
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(cartProducts));
  }),

  rest.post<PostReqBody>('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json<PostReqBody>();
    const authorization = req.headers.get('Authorization');

    if (authorization !== 'Basic bob:486') {
      return res(ctx.status(401), ctx.json(authorizationError));
    }

    return res(ctx.status(201), ctx.set('Location', `/cart-items/${productId}`), ctx.json({}));
    // 아래 명세상 원래는 productId가 아닌, cartItemId가 반환됨
    // https://techcourse.woowahan.com/s/zNFZ8xuU/ls/gRaMDVpX
    // Location: /cart-items/{cartItemId}
  }),
];
