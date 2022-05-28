import { rest } from 'msw';
import SERVER_URL from '../../configs/api';
import * as db from '../db.json';

const { products, cart } = db;
const userId = '1';

const productsHandlers = [
  rest.get(`${SERVER_URL}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const cartItem = cart.find((cartItem) => cartItem.userId === userId);

    if (!cartItem) {
      return res(ctx.status(404), ctx.json(new Error('no such user')));
    }

    const isAddedToCart = !!cartItem.items.find(
      ({ productId }) => productId === id
    );

    if (id) {
      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.json({
          ...products.find((product) => product.id === id),
          isAddedToCart,
        })
      );
    }
  }),
  rest.get(`${SERVER_URL}/products`, (req, res, ctx) => {
    const ids = req.url.searchParams.getAll('id');

    if (ids.length > 0) {
      return res(
        ctx.status(200),
        ctx.json(ids.map((id) => products.find((product) => product.id === id)))
      );
    }

    return res(ctx.status(200), ctx.json(products));
  }),
];

export default productsHandlers;
