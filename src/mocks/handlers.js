import { rest } from 'msw';
import { productList, cartList } from 'assets/mock';

export const handlers = [
  rest.get('/product/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id: +id,
        name: '캐스터네츠 커스텀캣타워H_가드형',
        imgUrl:
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1608536490_103005_1.jpg?gif=1&w=1280&h=1280&c=c',
        price: '619000',
        quantity: 10,
      }),
    );
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/cart/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('/cart/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),
];
