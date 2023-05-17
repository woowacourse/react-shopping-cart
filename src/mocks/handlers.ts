import { rest } from 'msw';
import mockData from './data/mockData.json';

const handlers = [
  rest.get('/products', (req, res, ctx) =>
    res(ctx.delay(2222), ctx.status(200), ctx.json(mockData))
  ),

  rest.get('/cart-items', (req, res, ctx) =>
    res(
      ctx.delay(2222),
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          quantity: 5,
          product: {
            id: 1,
            price: 10000,
            name: '치킨',
            imageUrl: 'http://example.com/chicken.jpg',
          },
        },
        {
          id: 2,
          quantity: 1,
          product: {
            id: 2,
            price: 20000,
            name: '피자',
            imageUrl: 'http://example.com/pizza.jpg',
          },
        },
      ])
    )
  ),
];

export default handlers;
