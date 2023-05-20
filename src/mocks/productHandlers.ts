import { rest } from 'msw';
import { useMockData } from '../hooks/useMockData';

export const productHandlers = [
  rest.get('/products', (_, res, ctx) => {
    const { mockData } = useMockData();

    return res(ctx.json(mockData), ctx.status(200));
  }),
  rest.get('/products/:id', (req, res, ctx) => {
    const id = Number(req.params.id);
    const { mockData } = useMockData();

    const product = mockData.find((p) => p.id === id);

    return res(ctx.json(product), ctx.status(200));
  }),
];
