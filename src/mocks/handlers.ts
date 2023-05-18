import { rest } from 'msw';
import { CartItem } from '../types/cart';
import { mockProducts } from '../data/mockProducts';
import { mockCart } from '../data/mockCart';

export const handlers = [
  //상품 리스트 받아오기
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),

  //장바구니 리스트 받아오기
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCart));
  }),

  //장바구니 아이템 추가
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

    return res(ctx.status(200));
  }),

  //장바구니 아이템 수량 수정
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const { quantity } = await req.json();
    console.log(mockCart, id, quantity);
    const index = mockCart.findIndex(
      (item: CartItem) => item.id === Number(id)
    );

    if (index === -1) {
      return res(ctx.status(400));
    }

    mockCart[index] = { ...mockCart[index], quantity };

    return res(ctx.status(200));
  }),

  //장바구니 아이템 삭제
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const { id } = req.params;

    const index = mockCart.findIndex(
      (item: CartItem) => item.id === Number(id)
    );
    console.log(index);
    if (index === -1) {
      return res(
        ctx.status(400, '해당 아이템이 장바구니에 존재하지 않습니다.')
      );
    }

    mockCart.splice(index, 1);
    return res(ctx.status(204));
  }),
];
