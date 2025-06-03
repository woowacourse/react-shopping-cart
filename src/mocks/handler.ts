import { http, HttpResponse } from 'msw';
import cartItems from './data/cartItems.json';
import { CartItemResponse } from '../types/response';
import { URLS } from '../constants/url';
const serverCartItems = JSON.parse(JSON.stringify(cartItems)) as CartItemResponse;

type PatchProductRequestBody = {
  quantity: number;
};

export const handlers = [
  http.get(URLS.CART_ITEMS, () => {
    return HttpResponse.json(serverCartItems);
  }),

  http.patch(`${URLS.CART_ITEMS}/:cartItemId`, async ({ params, request }) => {
    const idToPatch = Number(params.cartItemId);
    const { quantity } = (await request.json()) as PatchProductRequestBody;

    if (quantity === 0) {
      serverCartItems.content = serverCartItems.content.filter((item) => item.id !== idToPatch);
    } else {
      serverCartItems.content = serverCartItems.content.map((item) =>
        item.id === idToPatch ? { ...item, quantity } : item
      );
    }

    return new HttpResponse(null, { status: 200 });
  }),

  http.delete(`${URLS.CART_ITEMS}/:cartItemId`, ({ params }) => {
    const idToDelete = Number(params.cartItemId);

    serverCartItems.content = serverCartItems.content.filter((item) => item.id !== idToDelete);

    return new HttpResponse(null, { status: 204 });
  })
];
