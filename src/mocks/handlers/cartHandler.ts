import { rest } from 'msw';
import cart from './cartData';
import products from './productData';

export default function handlers() {
  return [
    rest.get('/cart-items', getCart),
    rest.post('/cart-items', addToCart),
    rest.patch('/cart-items/:id', updateCart),
    rest.delete('/cart-items/:id', removeFromCart),
  ];
}

const getCart: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.delay(3000), ctx.status(200), ctx.json({ response: [...cart] }));
};

const addToCart: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const { productId } = await req.json();

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res(ctx.status(404), ctx.json({ message: 'Product not found.' }));
  }

  cart.push({
    id: cart.length + 1,
    quantity: 1,
    product,
  });

  return res(
    ctx.status(201),
    ctx.set('Location', `/cart-items/${productId}`),
    ctx.json({ response: cart }),
  );
};

const updateCart: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  const cartItemId = parseInt(req.params.id as string, 10);
  const { quantity } = (await req.json()) as { quantity: number };
  const cartItem = cart.find((c) => c.product.id === cartItemId);
  if (!cartItem) {
    return res(ctx.status(404), ctx.json({ message: 'Cart item not found.' }));
  }
  cartItem.quantity = quantity;
  return res(ctx.status(200), ctx.json({ response: cartItem }));
};

const removeFromCart: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  const cartItemId = parseInt(req.params.id as string, 10);

  const cartItemIndex = cart.findIndex((c) => c.product.id === cartItemId);
  if (cartItemIndex === -1) {
    return res(ctx.status(404));
  }
  cart.splice(cartItemIndex, 1);
  return res(ctx.status(204));
};
