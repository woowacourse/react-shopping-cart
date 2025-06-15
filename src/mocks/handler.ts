import { http, HttpResponse } from 'msw';
import cartItems from './data/cartItems.json';
import { CartItemResponse } from '../types/response';
import { API_END_POINTS } from '../constants/apiEndPoint';
import { httpClient } from '../api/httpClient';

const serverCartItems = JSON.parse(JSON.stringify(cartItems)) as CartItemResponse;

type PatchProductRequestBody = {
  quantity: number;
};

export const handlers = [
  // 장바구니 목록 조회
  http.get(httpClient.baseUrl + API_END_POINTS.CART_ITEMS, () => {
    return HttpResponse.json(serverCartItems);
  }),

  // 장바구니 개수 변경
  http.patch(`${httpClient.baseUrl + API_END_POINTS.CART_ITEMS}/:cartItemId`, async ({ params, request }) => {
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

  // 장바구니 아이템 삭제
  http.delete(`${httpClient.baseUrl + API_END_POINTS.CART_ITEMS}/:cartItemId`, ({ params }) => {
    const idToDelete = Number(params.cartItemId);

    serverCartItems.content = serverCartItems.content.filter((item) => item.id !== idToDelete);

    return new HttpResponse(null, { status: 204 });
  })
];
