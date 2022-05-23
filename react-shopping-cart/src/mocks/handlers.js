import mockData from './mockData.json';
import { rest } from 'msw';

import { API_URL } from 'constants';

const fetchProducts = rest.get(`${API_URL}/products`, (req, res, ctx) => {
  const page = req.url.searchParams.get('_page');
  const limit = req.url.searchParams.get('_limit');

  const mockResponse = mockData.products.slice(
    (page - 1) * limit,
    page * limit
  );

  if (mockResponse.length > 0)
    return res(ctx.status(200), ctx.json(mockResponse));

  return res(ctx.status(400));
});

const fetchProduct = rest.get(`${API_URL}/products/:id`, (req, res, ctx) => {
  const { id } = req.params;

  const mockResponse = mockData.products.find(
    (product) => product.id === Number(id)
  );

  if (mockResponse) return res(ctx.status(200), ctx.json(mockResponse));

  return res(ctx.status(400));
});

const fetchCarts = rest.get(`${API_URL}/carts`, (req, res, ctx) => {
  const mockCarts = JSON.parse(localStorage.getItem('mockCarts')) ?? [];

  if (mockCarts) return res(ctx.status(200), ctx.json(mockCarts));

  return res(ctx.status(400));
});

const addProductToCart = rest.post(`${API_URL}/carts`, (req, res, ctx) => {
  const product = req.body;

  const mockCarts = JSON.parse(localStorage.getItem('mockCarts')) ?? [];
  const newMockCarts = [...mockCarts, product];

  localStorage.setItem('mockCarts', JSON.stringify(newMockCarts));

  return res(ctx.status(201));
});

const deleteProductFromCart = rest.delete(
  `${API_URL}/carts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    const mockCarts = JSON.parse(localStorage.getItem('mockCarts')) ?? [];

    const newMockCarts = mockCarts.filter((cart) => cart.id !== id);

    if (mockCarts.length === newMockCarts.length) return res(ctx.status(404));

    localStorage.setItem('mockCarts', JSON.stringify(newMockCarts));

    return res(ctx.status(200));
  }
);

export const handlers = [
  fetchCarts,
  fetchProducts,
  fetchProduct,
  addProductToCart,
  deleteProductFromCart,
];
