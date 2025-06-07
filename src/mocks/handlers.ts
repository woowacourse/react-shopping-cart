import { http, HttpResponse } from 'msw';
import { mockCoupons, fetchedData } from '../../test/mocks';

export const handlers = [
  http.get('*/cart-items', () => {
    return HttpResponse.json(fetchedData);
  }),

  http.delete(`*/cart-items/:id`, async ({ params }) => {
    const id = Number(params.id);
    fetchedData.content = fetchedData.content.filter((cart) => cart.id !== id);
    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.patch(`*/cart-items/:id`, async ({ params, request }) => {
    const cartId = Number(params.id);
    const body = await request.json();
    const { quantity } = body as { quantity: number };
    const cartIndex = fetchedData.content.findIndex(
      (item) => item.id === cartId
    );
    if (!cartId || quantity < 1) return HttpResponse.error();
    const cartItem = fetchedData.content[cartIndex];
    fetchedData.content[cartIndex] = {
      ...cartItem,
      quantity,
    };
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),

  http.get('*/cart-items-error', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }),

  http.delete('*/cart-items/:id-error', async () => {
    return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
  }),

  http.patch('*/cart-items/:id-error', async () => {
    return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
  }),
  http.get('*/coupons', () => {
    return HttpResponse.json({
      content: mockCoupons,
    });
  }),
];
