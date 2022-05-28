import { rest } from 'msw';
import { data } from './getProducts';

const HOST_NAME = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${HOST_NAME}/products`, (req, res, ctx) => res(ctx.status(200), ctx.json(data))),

  rest.get(`${HOST_NAME}/product`, (req, res, ctx) => {
    const productId = req.url.searchParams.get('id');

    return res(
      ctx.status(200),
      ctx.json({
        id: productId,
        thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
        name: '싱싱한 감자',
        price: '50000',
      }),
    );
  }),
];
