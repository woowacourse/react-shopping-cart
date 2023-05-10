import { rest } from 'msw';
import { products } from '../data/mockData';
import { Product } from '../components/ProductItem/types';

export const handlers = [
  // 제품 목록
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 제품 추가
  rest.post('/products', (req, res, ctx) => {
    const newData = req.json();
    const id = Math.random().toString(36).substring(7);
    const responseWithId = { ...newData, id: Number(id) };
    products.push(responseWithId as unknown as Product);

    return res(ctx.status(201), ctx.json(responseWithId));
  }),

  // 특정 id의 제품 정보
  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find(item => item.id === Number(id));
    const responseWithId = { ...product, id };
    if (responseWithId) {
      return res(ctx.status(200), ctx.json(responseWithId));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 삭제
  rest.delete('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      products.splice(index, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 수정
  rest.put('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));
    if (index !== -1) {
      products[index] = req.json() as unknown as Product;
      return res(ctx.json(products[index]));
    } else {
      return res(ctx.status(404));
    }
  }),
];
