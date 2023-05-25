import { rest } from 'msw';
import { CartItem } from '../types/cart';
import { mockProducts } from '../data/mockProducts';
import { mockCart } from '../data/mockCart';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCart));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { id, quantity, product } = await req.json();

    const index = mockCart.findIndex((item: CartItem) => item.id === id);

    if (index === -1) {
      mockCart.push({
        id,
        quantity,
        product,
      });
    } else {
      mockCart[index] = {
        id,
        quantity: mockCart[index].quantity + quantity,
        product,
      };
    }

    localStorage.setItem('cart-items', JSON.stringify(mockCart));

    return res(ctx.status(200));
  }),

  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const { quantity } = await req.json();

    const index = mockCart.findIndex(
      (item: CartItem) => item.id === Number(id)
    );

    if (index === -1) {
      return res(ctx.status(400));
    }

    mockCart[index] = { ...mockCart[index], quantity };

    localStorage.setItem('cart-items', JSON.stringify(mockCart));

    return res(ctx.status(200));
  }),

  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const { id } = req.params;

    const index = mockCart.findIndex(
      (item: CartItem) => item.id === Number(id)
    );

    if (index === -1) {
      return res(
        ctx.status(400, '해당 아이템이 장바구니에 존재하지 않습니다.')
      );
    }

    mockCart.splice(index, 1);

    localStorage.setItem('cart-items', JSON.stringify(mockCart));

    return res(ctx.status(204));
  }),
];
