// src/mocks/handlers.js
import { rest } from 'msw'
import mockData from '../assets/mockData.json'

export const handlers = [

  rest.get('/products', (req, res, ctx) => {

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json(mockData),
    )
  }),

  rest.get('/cart-items', (req, res, ctx) => {

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json([]),
    )
  }),

  rest.post('/cart-items', (req, res, ctx) => {
    console.log(req.body);

    return res(
      ctx.delay(100),
      ctx.status(201),
      ctx.json(true),
    )
  }),
];
