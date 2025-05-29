import { http, HttpResponse } from 'msw';
import cartItems from './cartItems.json';

// import { CartItem } from '../shared/type/cart';
// const selectedCartItems: CartItem[] = [];

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${BASE_URL}/cart-items*`, () => {
    console.log('@@Eljlwkjr', cartItems);
    return HttpResponse.json(cartItems);
  }),

  // http.patch(`${BASE_URL}/cart-items/:id`, async ({ params, request }) => {}),

  // http.delete(`${BASE_URL}/cart-items/:id`, ({ params }) => {}),
];
