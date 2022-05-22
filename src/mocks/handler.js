import { LOCAL_URL } from 'constants/constants';
import { productList, shoppingCartList } from './mockData';
import { rest } from 'msw';

export const getProductHandler = [
  rest.get(LOCAL_URL + 'products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get(LOCAL_URL + 'shoppingCart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(shoppingCartList));
  }),

  rest.put(LOCAL_URL + `shoppingCart/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const index = shoppingCartList.findIndex(product => product.id === +productId);

    shoppingCartList.splice(index, 1, req.body);
    return res(ctx.status(200), ctx.json(shoppingCartList));
  }),

  rest.post(LOCAL_URL + `shoppingCart`, (req, res, ctx) => {
    shoppingCartList.push(req.body);
    return res(ctx.status(200), ctx.json(shoppingCartList));
  }),

  rest.delete(LOCAL_URL + `shoppingCart/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const index = shoppingCartList.findIndex(product => product.id === +productId);

    shoppingCartList.splice(index, 1);
    return res(ctx.status(200), ctx.json(shoppingCartList));
  }),
];
