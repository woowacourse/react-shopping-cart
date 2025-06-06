import { http, HttpResponse } from 'msw';
import mockCart from './mockCart.json';
import mockCoupons from './mockCoupon.json';

export const handlers = [
  http.get(`/cart-items`, () => {
    return HttpResponse.json({
      content: mockCart,
    });
  }),

  http.delete(`/cart-items/:cartItemId`, ({ params }) => {
    const cartItemId = parseInt(params.cartItemId as string);

    const itemIndex = mockCart.findIndex((item) => item.id === cartItemId);

    if (itemIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockCart.splice(itemIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch(`/cart-items/:cartItemId`, async ({ params, request }) => {
    const cartItemId = parseInt(params.cartItemId as string);
    const body = (await request.json()) as { quantity: number };

    const itemIndex = mockCart.findIndex((item) => item.id === cartItemId);

    if (itemIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    if (body.quantity <= 0) {
      mockCart.splice(itemIndex, 1);
      return new HttpResponse(null, { status: 204 });
    }

    const item = mockCart[itemIndex];
    item.quantity = body.quantity;
    const product = mockCart.find((p) => p.id === item.product.id);

    return HttpResponse.json({
      ...item,
      product: product || null,
    });
  }),

  http.get('/coupons', () => {
    return HttpResponse.json({
      content: mockCoupons,
    });
  }),
];
