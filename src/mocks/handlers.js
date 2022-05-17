import { rest } from 'msw';
import { API_URL } from '../api/constants';
import { removeProperty } from '../utils';
import data from './data';
import images from './images';

const cartDB = () => {
  let cart = JSON.parse(window.localStorage.getItem('server-shopping-cart')) || {};

  const getCart = () => cart;
  const setCart = (newCart) => {
    cart = newCart;
    window.localStorage.setItem('server-shopping-cart', JSON.stringify(newCart));
  };

  return { getCart, setCart };
};

const { getCart, setCart } = cartDB();

const getProducts = rest.get(`${API_URL}products`, (req, res, ctx) => {
  const page = req.url.searchParams.get('_page');
  const limit = req.url.searchParams.get('_limit');

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit - 1;

  const productList = data.products.slice(startIndex, endIndex);
  const productTotalCount = data.products.length;

  return res(ctx.status(200), ctx.json(productList), ctx.set('x-total-count', productTotalCount));
});

const getImage = rest.get(`${API_URL}static/images/:imageFileName`, async (req, res, ctx) => {
  const { imageFileName } = req.params;
  const imageName = imageFileName.split('.')[0];

  const imageBuffer = await fetch(images[`${imageName}`]).then((res) => res.arrayBuffer());

  return res(
    ctx.set('Content-Length', imageBuffer.byteLength.toString()),
    ctx.set('Content-Type', 'image/jpeg'),
    ctx.body(imageBuffer),
  );
});

const getShoppingCart = rest.get(`${API_URL}shopping-cart`, (_, res, ctx) => {
  const cart = getCart();
  return res(ctx.json(cart));
});

const postShoppingCart = rest.post(`${API_URL}shopping-cart`, (req, res, ctx) => {
  const currentShoppingCart = getCart();
  const { productId, quantity } = req.body;

  const newCart = updateCartProductQuantity(currentShoppingCart, productId, quantity);

  setCart(newCart);

  return res(ctx.json(newCart));
});

const updateCartProductQuantity = (cart, productId, quantity) => {
  const newCart = { ...cart };
  if (newCart[productId] === undefined) {
    const newProduct = {};
    newProduct.productData = data.products.find(({ id }) => id === productId);
    newProduct.quantity = quantity;

    newCart[productId] = newProduct;
  } else {
    newCart[productId].quantity += quantity;
  }

  return newCart;
};

const patchShoppingCart = rest.patch(`${API_URL}shopping-cart`, (req, res, ctx) => {
  const { productId, quantity } = req.body;
  const currentShoppingCart = getCart();

  if (!Object.keys(currentShoppingCart).length || !currentShoppingCart[productId]) {
    return res(ctx.status(404, '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.'));
  }

  const targetProduct = currentShoppingCart[productId];
  targetProduct.quantity = quantity;

  currentShoppingCart[productId] = targetProduct;

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
});

const deleteShoppingCart = rest.delete(`${API_URL}shopping-cart/:productId`, (req, res, ctx) => {
  const { productId } = req.params;
  const currentShoppingCart = getCart();

  if (!Object.keys(currentShoppingCart).length || !currentShoppingCart[productId]) {
    return res(ctx.status(404, '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.'));
  }

  const newCart = removeProperty(currentShoppingCart, productId);

  setCart(newCart);

  return res(ctx.json(newCart));
});

export const handlers = [
  getProducts,
  getImage,
  getShoppingCart,
  postShoppingCart,
  patchShoppingCart,
  deleteShoppingCart,
];
