import cart from '../fixtures/cart';
import products from '../fixtures/products';
import rest from '../rest';

export const handlers = [
  rest.on('GET /cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.on('POST /cart-items', async (req, res, ctx) => {
    const body = await req.json();
    const { productId } = body;

    if (cart.some((cartItem) => cartItem.product.id === productId)) {
      return res(
        ctx.status(409),
        ctx.json({
          message: '이미 카드에 존재하는 상품입니다.',
        }),
      );
    }

    const product = products.find((it) => it.id === productId) ?? null;
    if (product === null) {
      return res(
        ctx.status(404),
        ctx.json({
          message: '존재하지 않는 상품입니다.',
        }),
      );
    }

    const cartItemId = Math.max(1, ...cart.map((cartItem) => cartItem.id)) + 1;

    cart.push({
      id: cartItemId,
      product,
      quantity: 1,
    });

    return res(ctx.status(201), ctx.set('Location', `/cart-items/${cartItemId}`));
  }),

  rest.on('PATCH /cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const body = await req.json();
    const quantity = Number(body.quantity);

    const cartItem = cart.find((it) => String(it.id) === cartItemId) ?? null;
    if (cartItem === null) {
      return res(
        ctx.status(400),
        ctx.json({
          message: '존재하지 않는 장바구니 아이템입니다.',
        }),
      );
    }

    cartItem.quantity = quantity;

    return res(ctx.status(200));
  }),

  rest.on('DELETE /cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;

    const foundIndex = cart.findIndex((it) => it.id === Number(cartItemId));
    if (foundIndex === -1) {
      return res(ctx.status(400), ctx.json({ message: '존재하지 않는 장바구니 아이템입니다.' }));
    }

    cart.splice(foundIndex, 1);
    return res(ctx.status(204));
  }),
];
