import { http, HttpResponse } from 'msw';
import cartListMockData from './cartListMockData';

// interface UpdateQuantityReq {
//   quantity: number;
// }

const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(cartListMockData);
  }),

  // http.patch(
  //   `${import.meta.env.VITE_BASE_URL}/cart-items/:id`,
  //   async ({ request, params }) => {
  //     const { id } = params;
  //     const { quantity } = await request.json();
  //   }
  // ),
];

export default handlers;
