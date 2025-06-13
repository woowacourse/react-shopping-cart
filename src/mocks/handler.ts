import { http, HttpResponse } from 'msw';
import rawCartItems from './cartItems.json';
import rawCoupons from './coupons.json';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let cartItems = [...rawCartItems];
const coupons = [...rawCoupons];

export const mockGetCartItems = http.get(`${BASE_URL}/cart-items*`, () => {
  return HttpResponse.json({ content: cartItems });
});

export const mockPatchCartItem = http.patch(`${BASE_URL}/cart-items/:id`, async ({ params, request }) => {
  const id = Number(params.id);
  const body = await request.json();
  const { quantity } = body as { quantity: number };

  const itemIndex = cartItems.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = quantity;
  }
  return HttpResponse.json({ message: '장바구니 아이템이 변경되었습니다.' });
});

export const mockDeleteCartItem = http.delete(`${BASE_URL}/cart-items/:id`, ({ params }) => {
  const id = Number(params.id);
  cartItems = cartItems.filter((item) => item.id !== id);
  return new HttpResponse(null, { status: 204 });
});

export const mockGetCoupons = http.get(`${BASE_URL}/coupons`, () => {
  return HttpResponse.json(coupons);
});
