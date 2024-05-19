import { http, HttpResponse } from 'msw';
import cartListMockData from './cartListMockData';

const handlers = [
  http.get('http://54.180.95.212:8080/cart-items', () => {
    return HttpResponse.json(cartListMockData);
  }),
];

export default handlers;
