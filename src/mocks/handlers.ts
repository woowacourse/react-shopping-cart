import { LOCAL_BASE_URL } from 'apis';
import { rest } from 'msw';
import { mockItemList } from './mockDB';
import { CartItem } from 'types/domain';

let mockCartList: CartItem[] = [];

export const handlers = [
  rest.get(`${LOCAL_BASE_URL}/itemList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockItemList));
  }),

  rest.get(`${LOCAL_BASE_URL}/itemList/:id`, (req, res, ctx) => {
    const itemId = Number(req.params.id);
    const targetItem = mockItemList.filter(item => item.id === itemId)[0];

    return res(ctx.status(200), ctx.json(targetItem));
  }),

  rest.get(`${LOCAL_BASE_URL}/cartList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCartList));
  }),

  rest.post(`${LOCAL_BASE_URL}/cartList`, (req, res, ctx) => {
    const cartItem: CartItem = Object(req.body);
    const isPutReq = mockCartList.some(item => item.id === cartItem.id);

    if (isPutReq) {
      const newCartList = mockCartList.map(item => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      mockCartList = [...newCartList];
    }

    if (!isPutReq) {
      mockCartList.push(cartItem);
    }

    return res(ctx.status(200));
  }),

  rest.delete(`${LOCAL_BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const deleteId = Number(req.params.id);

    const newCartList = mockCartList.filter(item => item.id !== deleteId);

    mockCartList = [...newCartList];

    return res(ctx.status(200));
  }),

  rest.put<CartItem>(`${LOCAL_BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const cartItem: CartItem = req.body;

    const newCartList = mockCartList.map(item => {
      if (item.id === cartItem.id) {
        return { ...cartItem };
      }

      return item;
    });

    mockCartList = [...newCartList];

    return res(ctx.status(200), ctx.json(cartItem));
  }),
];
