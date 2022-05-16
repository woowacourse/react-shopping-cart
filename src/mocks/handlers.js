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

    if (currentShoppingCart[productId] === undefined) {
      const newProduct = {};
      newProduct.productData = data.products.find(({ id }) => id === productId);
      newProduct.quantity = quantity;
      currentShoppingCart[productId] = newProduct;
    } else {
      currentShoppingCart[productId].quantity += quantity;
    }

    window.localStorage.setItem('server-shopping-cart', JSON.stringify(currentShoppingCart));

    return res(ctx.json(currentShoppingCart));
  }),
  rest.get(`${API_URL}shopping-cart`, (_, res, ctx) => {
    const cart = JSON.parse(window.localStorage.getItem('server-shopping-cart')) || {};
    return res(ctx.json(cart));
  }),
  rest.patch(`${API_URL}shopping-cart`, (req, res, ctx) => {
    const { productId, quantity } = req.body;
    const currentShoppingCart = JSON.parse(window.localStorage.getItem('server-shopping-cart'));

    if (!currentShoppingCart || !currentShoppingCart[productId]) {
      return res(ctx.status(404, '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.'));
    }

    const targetProduct = currentShoppingCart[productId];
    targetProduct.quantity = quantity;

    currentShoppingCart[productId] = targetProduct;

    window.localStorage.setItem('server-shopping-cart', JSON.stringify(currentShoppingCart));

    return res(ctx.json(currentShoppingCart));
  }),
];
