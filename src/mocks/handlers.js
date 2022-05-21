import { rest } from 'msw';
import { productsData } from './productsData';

const baseUrl = 'https://tigers-react-shopping-cart.herokuapp.com';

export const handlers = [
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(`${baseUrl}/products/:idList`, (req, res, ctx) => {
    const { idList } = req.params;

    const ids = idList.split(',');
    const products = productsData.filter(product => ids.includes(String(product.id)));

    return res(ctx.json(products));
  }),
];
