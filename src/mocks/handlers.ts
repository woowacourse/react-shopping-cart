import { http, HttpResponse } from 'msw';
import cartListMockData from './cartListMockData';

const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, () => {
    return HttpResponse.json(cartListMockData);
  }),
];

export default handlers;
