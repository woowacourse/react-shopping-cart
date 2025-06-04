import { http, HttpResponse } from 'msw';
import { fetchedCartData, mockCoupons } from '../../test/mocks';

export const handlers = [
  http.get('*/cart-items', () => {
    return HttpResponse.json(fetchedCartData);
  }),

  http.delete(`*/cart-items/:id`, async ({ params }) => {
    const id = Number(params.id);
    fetchedCartData.content = fetchedCartData.content.filter((cart) => cart.id !== id);
    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.patch(`*/cart-items/:id`, async ({ params, request }) => {
    const cartId = Number(params.id);
    const body = await request.json();
    const { quantity } = body as { quantity: number };
    const cartIndex = fetchedCartData.content.findIndex((item) => item.id === cartId);
    if (!cartId || quantity < 1) return HttpResponse.error();
    const cartItem = fetchedCartData.content[cartIndex];
    fetchedCartData.content[cartIndex] = {
      ...cartItem,
      quantity,
    };
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),

  http.get(`*/coupons`, () => {
    return HttpResponse.json(mockCoupons);
  }),
];
