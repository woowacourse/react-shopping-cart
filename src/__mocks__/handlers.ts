import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../apis/config";
import cartItems from "./cartItems.json";

const END_POINT = "/cart-items";

interface PatchCartItemsRequestBody {
  id: number;
  quantity: number;
}

const currentCartItems = { ...cartItems };

export const handlers = [
  /**
   * CartItems API : GET
   */
  http.get(`${API_BASE_URL}${END_POINT}`, async () => {
    return HttpResponse.json(currentCartItems);
  }),

  /**
   * CartItems API : DELETE
   */
  http.delete(`${API_BASE_URL}${END_POINT}/:cartId`, async ({ params }) => {
    const { cartId } = params;

    const initialLength = currentCartItems.content.length;
    currentCartItems.content = currentCartItems.content.filter(
      (item) => item.id !== Number(cartId)
    );

    if (currentCartItems.content.length === initialLength) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  /**
   * CartItems API : PATCH
   */
  http.patch(`${API_BASE_URL}${END_POINT}/:cartId`, async ({ request }) => {
    const { id: cartId, quantity } =
      (await request.json()) as PatchCartItemsRequestBody;

    const item = currentCartItems.content.find((item) => item.id === cartId);

    if (!item) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    item.quantity = quantity;

    return HttpResponse.json(item);
  }),
];
