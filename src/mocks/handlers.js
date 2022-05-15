import { rest } from 'msw';
import { API_URL } from '../api/constants';
import data from './data';
import images from './images';

export const handlers = [
  rest.get(`${API_URL}products`, (req, res, ctx) => {
    const page = req.url.searchParams.get('_page');
    const limit = req.url.searchParams.get('_limit');

    const sliceIndex = [(page - 1) * limit, page * limit - 1];

    const productSrc = data.products;

    const productList = productSrc.slice(sliceIndex[0], sliceIndex[1]);
    const productTotalCount = productSrc.length;

    return res(ctx.status(200), ctx.json(productList), ctx.set('x-total-count', productTotalCount));
  }),
  rest.get(`${API_URL}static/images/:imageFileName`, async (req, res, ctx) => {
    const { imageFileName } = req.params;
    const imageName = imageFileName.split('.')[0];

    const imageBuffer = await fetch(images[`${imageName}`]).then((res) => res.arrayBuffer());

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(imageBuffer),
    );
  }),
  rest.post(`${API_URL}shopping-cart`, (req, res, ctx) => {
    const currentShoppingCart =
      JSON.parse(window.localStorage.getItem('server-shopping-cart')) || {};
    const { productId, quantity } = req.body;
    currentShoppingCart[productId] = currentShoppingCart[productId]
      ? currentShoppingCart[productId] + quantity
      : quantity;

    window.localStorage.setItem('server-shopping-cart', JSON.stringify(currentShoppingCart));

    return res(ctx.json(currentShoppingCart));
  }),
];
