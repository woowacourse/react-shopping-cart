import { rest } from 'msw';
import { productList } from 'assets/mock';

const cartList = [];

export const handlers = [
  rest.get('/product/:id', (req, res, ctx) => {
    console.log(req);
    const { id } = req.params;
    const product = productList.find((product) => product.id === +id);

    return res(ctx.json(product));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/cart', (req, res, ctx) => {
    console.log('req.body', req.body);
    // console.log(req);
    cartList.push(req.body);
    // console.log('cartList', cartList);
    return res(ctx.status(201));
  }),

  rest.get('/cart', (req, res, ctx) => {
    // TODO
    return res(ctx.status(200), ctx.json(cartList));
  }),
];
