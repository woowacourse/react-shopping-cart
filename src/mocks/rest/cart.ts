import { rest } from 'msw';
import { products } from '../products';

let cart = [
  {
    id: 1,
    quantity: 5,
    product: {
      id: 1,
      name: '[23 F/W] Tom Brown',
      price: 930000,
      imageUrl:
        'https://image.msscdn.net/images/goods_img/20221017/2867105/2867105_1_220.jpg',
    },
  },
];

let cartId = 1;

export const getCartItems = rest.get('/cart-items', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(cart));
});

export const postCartItem = rest.post('/cart-items', async (req, res, ctx) => {
  const { productId } = await req.json();
  const cartItem = cart.find((cartItem) => cartItem.product.id === +productId);
  const targetProduct = products.find((product) => product.id === +productId);

  if (!targetProduct) {
    return res(ctx.status(400));
  }

  if (!cartItem) {
    const newCartItem = {
      id: ++cartId,
      quantity: 1,
      product: targetProduct,
    };
    cart = [...cart, newCartItem];
    return res(
      ctx.status(201),
      ctx.set('Location', `/cart-items/${newCartItem.id}`)
    );
  }

  cartItem.quantity = 1;
  return res(
    ctx.status(200),
    ctx.set('Location', `/cart-items/${cartItem.id}`)
  );
});

export const deleteCartItem = rest.delete(
  '/cart-items/:cartItemId',
  (req, res, ctx) => {
    cart = cart.filter((cartItem) => cartItem.id !== +req.params.cartItemId);

    return res(ctx.status(204));
  }
);

export const patchCartItem = rest.patch(
  '/cart-items/:cartId',
  async (req, res, ctx) => {
    const data = await req.json();
    const cartItem = cart.find(
      (cartItem) => cartItem.id === +req.params.cartId
    );

    if (!cartItem) return res(ctx.status(400));

    cartItem.quantity = data.quantity;
    return res(ctx.status(200));
  }
);
