import { PatchCartItemsParams, PostCartItemsParams } from "@/apis/CartItemApi";
import { API_PATH, CONFIG } from "@/constants";
import { http, HttpResponse } from "msw";
import { CART_ITEMS_DATA } from "./datas/cartItems";
import { PRODUCTS_DATA } from "./datas/products";
import { COUPON_DATA } from "./datas/coupons";

export let cartItems = [...CART_ITEMS_DATA.content];

export let MOCK_DELAY = 0; // ms
export let ERROR_PROBABILITY = 0; // 0~1 (0.2 = 20% 확률)

export function setMockDelay(ms: number) {
  MOCK_DELAY = ms;
}
export function setErrorProbability(prob: number) {
  ERROR_PROBABILITY = prob;
}
function maybeError() {
  return Math.random() < ERROR_PROBABILITY;
}

export function resetCartItems() {
  cartItems = [...CART_ITEMS_DATA.content];
}

import { delay } from "msw";

export const handlers = [
  /** Mocking products API */
  http.get(`${CONFIG.baseUrl}${API_PATH.products}`, async () => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    return HttpResponse.json(PRODUCTS_DATA);
  }),

  /** Mocking cartItems API */
  http.get(`${CONFIG.baseUrl}${API_PATH.cartItems}`, async () => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    return HttpResponse.json({ content: cartItems });
  }),

  http.post(`${CONFIG.baseUrl}${API_PATH.cartItems}`, async ({ request }) => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    const { productId, quantity = 1 } = (await request.json()) as PostCartItemsParams;
    const product = PRODUCTS_DATA.content.find((product) => product.id === productId);

    if (!product) {
      return HttpResponse.json(
        {
          errorCode: "NOT_FOUND",
          message: "상품을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    if (product.stock < quantity) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 },
      );
    }

    const newId = cartItems.length ? Math.max(...cartItems.map((item) => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      quantity,
      product,
    };
    cartItems.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.delete(`${CONFIG.baseUrl}${API_PATH.cartItems}/:cartItemId`, async ({ params }) => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    const { cartItemId } = params;
    cartItems = cartItems.filter((item) => item.id !== Number(cartItemId));
    return HttpResponse.json({ message: "Cart item deleted" });
  }),

  http.patch(`${CONFIG.baseUrl}${API_PATH.cartItems}/:cartItemId`, async ({ params, request }) => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    const { cartItemId } = params;
    const { quantity } = (await request.json()) as PatchCartItemsParams;
    const item = cartItems.find((item) => item.id === Number(cartItemId));
    if (!item) return HttpResponse.json({ message: "Cart item not found" }, { status: 404 });

    const product = PRODUCTS_DATA.content.find((p) => p.id === item.product.id);
    if (!product) {
      return HttpResponse.json(
        {
          errorCode: "NOT_FOUND",
          message: "상품을 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    if (product.stock < quantity) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 },
      );
    }

    item.quantity = quantity;
    return HttpResponse.json(item);
  }),

  /** Mocking coupons API */
  http.get(`${CONFIG.baseUrl}${API_PATH.coupons}`, async () => {
    if (maybeError()) {
      await delay(MOCK_DELAY);
      return HttpResponse.json({ message: "랜덤 에러 발생!" }, { status: 500 });
    }
    await delay(MOCK_DELAY);
    return HttpResponse.json(COUPON_DATA);
  }),
];
