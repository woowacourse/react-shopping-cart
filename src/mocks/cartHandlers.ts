import { rest } from 'msw';
import {
  CART_ID_LIST_KEY,
  CART_ITEM_QUANTITIES_KEY,
  getCartIdList,
  getCartItemQuantities,
} from '../utils/localStorage';
import { useMockData } from '../hooks/useMockData';

export const cartHandlers = [
  rest.get('/cart-items', (_, res, ctx) => {
    const cartIdList = getCartIdList();
    const cartQuantities = getCartItemQuantities();
    const { mockData } = useMockData();

    return res(
      ctx.json(
        cartIdList.map((cartId) => {
          const cartItem = mockData.find((product) => product.id === cartId);
          const quantity = cartQuantities[`${cartId}`];

          return {
            id: cartItem?.id,
            product: { ...cartItem },
            quantity,
          };
        })
      ),
      ctx.status(200)
    );
  }),
  rest.get('/cart-items/quantity/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const cartQuantities = getCartItemQuantities();
    const quantity = cartQuantities[`${productId}`];

    return res(ctx.json(`${quantity}`), ctx.status(200));
  }),
  rest.post('/cart-items', async (req, res, ctx) => {
    const requestData = await req.json();
    const productId = await requestData.id;
    const cartIdList = getCartIdList();

    if (!cartIdList.includes(productId))
      localStorage.setItem(
        CART_ID_LIST_KEY,
        JSON.stringify([...cartIdList, productId])
      );

    return res(ctx.json('success'), ctx.status(200));
  }),
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const requestData = await req.json();
    const quantity = await requestData.quantity;

    const productId = Number(req.params.id);
    const cartItemQuantities = getCartItemQuantities();

    localStorage.setItem(
      CART_ITEM_QUANTITIES_KEY,
      JSON.stringify({ ...cartItemQuantities, [productId]: quantity })
    );

    return res(ctx.json('success'), ctx.status(200));
  }),
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const cartIdList = getCartIdList();
    const cartItemQuantities = getCartItemQuantities();

    if (cartIdList.includes(productId))
      localStorage.setItem(
        CART_ID_LIST_KEY,
        JSON.stringify(cartIdList.filter((cartId) => cartId !== productId))
      );

    if (Object.keys(cartItemQuantities).includes(`${productId}`)) {
      delete cartItemQuantities[`${productId}`];

      localStorage.setItem(
        CART_ITEM_QUANTITIES_KEY,
        JSON.stringify(cartItemQuantities)
      );
    }

    return res(ctx.json('success'), ctx.status(200));
  }),
];
