import { rest } from 'msw';

export const cartProducts = [
  {
    product_id: 1,
    cart_product_count: 1,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    product_title: '배달이친구들 케이블타이',
    product_price: 4000,
  },
  {
    product_id: 11,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    product_title: '엽서. 복',
    product_price: 1000,
  },
];

export const cartHandler = [
  rest.get('/mocking/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(cartProducts));
  }),
  rest.post('/mocking/cart', (req, res, ctx) => {
    if (cartProducts.find((product) => product.product_id === req.body.product_id)) {
      return res(ctx.status(202), ctx.delay(1000), ctx.json('same product in cart'));
    }
    cartProducts.push(req.body);
    return res(ctx.status(200), ctx.json(cartProducts));
  }),
  rest.patch('/mocking/cart/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(cartProducts));
  }),
];
