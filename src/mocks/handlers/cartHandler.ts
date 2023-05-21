import { rest } from 'msw';
import cart from './cartData';
import products from './productData';

export default function handlers() {
  return [
    rest.get('/cart-items', getCart),
    rest.post('/cart-items', addToCart),
    rest.put('/cart-items/:id', updateCart),
    rest.delete('/cart-items/:id', removeFromCart),
  ];
}

const getCart: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.delay(3000), ctx.status(200), ctx.json({ response: [...cart] }));
};

interface AddToCartReqBody {
  productId: number;
}

const addToCart: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  const { productId } = req.body as AddToCartReqBody;

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res(ctx.status(404), ctx.json({ message: 'Product not found.' }));
  }
  const cartItem = cart.find((c) => c.product.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      id: cart.length + 1,
      quantity: 1,
      product,
    });
  }
  return res(ctx.status(201), ctx.json({ response: cart }));
};

const updateCart: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  const cartItemId = parseInt(req.params.id as string, 10);
  const { quantity } = req.body as { quantity: number };
  const cartItem = cart.find((c) => c.id === cartItemId);
  if (!cartItem) {
    return res(ctx.status(404), ctx.json({ message: 'Cart item not found.' }));
  }
  cartItem.quantity = quantity;
  return res(ctx.status(200), ctx.json({ response: cartItem }));
};

const removeFromCart: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  const cartItemId = parseInt(req.params.id as string, 10);
  const cartItemIndex = cart.findIndex((c) => c.id === cartItemId);
  if (cartItemIndex === -1) {
    return res(ctx.status(404), ctx.json({ message: 'Cart item not found.' }));
  }
  cart.splice(cartItemIndex, 1);
  return res(ctx.status(204), ctx.json({ message: 'No Content' }));
};
