import {rest} from 'msw';

export const handlers = [
  rest.get('/products', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          name: '냉동 딸기 1kg',
          image: 'https://cdn-mart.baemin.com/sellergoods/bulk/20200730-181623/14254-main-01.jpg',
          price: 4400,
        },
      ]),
    ),
  ),
];
