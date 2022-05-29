import { API } from 'constants/api';
import { rest } from 'msw';
import { findByIdInObjectArray } from 'utils';
import { products, users } from 'mocks/data';

const cartsHandler = [
  rest.get(`/${API.CARTS}`, (req, res, ctx) => {
    const { userid } = req.headers['_headers'];

    if (userid) {
      return res(ctx.status(200), ctx.json(users[userid].carts));
    } else {
      return res(ctx.status(200), ctx.json([]));
    }
  }),

  rest.post(`/${API.CARTS}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { userid } = req.headers['_headers'];

    users[userid].carts.push({ id, quantity: 1 });

    return res(ctx.delay(500), ctx.status(200));
  }),

  rest.delete(`/${API.CARTS}/:cartList`, (req, res, ctx) => {
    const { cartList } = req.params;
    const { userid } = req.headers['_headers'];

    const requestedCartList = cartList.split('&');

    users[userid].carts = users[userid].carts.filter(
      (cart) => !requestedCartList.includes(cart.id)
    );

    return res(ctx.delay(500), ctx.status(204));
  }),

  rest.patch(`/${API.CARTS}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { userid } = req.headers['_headers'];

    const quantity = req.body;

    const targetCarts = users[userid].carts;
    findByIdInObjectArray(targetCarts, id).quantity = +quantity;

    return res(ctx.status(200), ctx.json(findByIdInObjectArray(products, id)));
  }),
];

export default cartsHandler;
