import { rest } from 'msw';
import { productsData } from './productsData';

const baseUrl = 'https://tigers-react-shopping-cart.herokuapp.com';

export const handlers = [
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(`${baseUrl}/products/:productId`, (req, res, ctx) => {
    const { productId } = req.params;

    const targetProduct = productsData.find(product => product.id === productId);
    console.log(productId);

    return res(ctx.json(targetProduct));
  }),
];
