import { http, HttpResponse } from "msw";
import { ResponseCartItem } from "../../types/types";
import { initializeCartItems } from "./productHandlers";

const API_URL = import.meta.env.VITE_BASE_URL;

let cartItemStore: ResponseCartItem[] = initializeCartItems();

export const cartItemHandlers = [
  http.get(`${API_URL}/cart-items`, () => {
    return HttpResponse.json({
      content: cartItemStore,
      totalElements: cartItemStore.length,
      totalPages: 1,
      size: cartItemStore.length,
      number: 0,
    });
  }),

  http.post(`${API_URL}/cart-items`, async ({ request }) => {
    const body = await request.json();
    const { productId, quantity } = body as {
      productId: number;
      quantity: number;
    };
    const productQuantity = productId === 1 ? 0 : 50 - (productId % 10);

    if (productQuantity === 0 || quantity > productQuantity) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message:
            productQuantity === 0
              ? "해당 상품은 품절되었습니다."
              : "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const newCartItem: ResponseCartItem = {
      id: productId,
      quantity,
      product: {
        id: productId,
        name: `상품 ${productId}`,
        price: 10000 * ((productId % 5) + 1),
        imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2016.37.43%402x.webp`,
        category: productId % 2 === 0 ? "식료품" : "패션잡화",
        quantity: productQuantity,
      },
    };

    cartItemStore.push(newCartItem);
    return HttpResponse.json(newCartItem, { status: 201 });
  }),

  http.delete(`${API_URL}/cart-items/:id`, ({ params }) => {
    const cartItemId = Number(params.id);
    cartItemStore = cartItemStore.filter((item) => item.id !== cartItemId);
    return HttpResponse.json({}, { status: 204 });
  }),

  http.patch(`${API_URL}/cart-items/:id`, async ({ params, request }) => {
    const body = await request.json();
    const { quantity } = body as { quantity: number };
    const cartItemId = Number(params.id);

    const cartItemIndex = cartItemStore.findIndex(
      (item) => item.id === cartItemId
    );

    if (cartItemIndex === -1) {
      return HttpResponse.json(
        {
          errorCode: "CART_ITEM_NOT_FOUND",
          message: "장바구니 상품을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    const cartItem = cartItemStore[cartItemIndex];
    const productQuantity = cartItem.product.quantity!;

    if (quantity > productQuantity) {
      return HttpResponse.json(
        {
          errorCode: "OUT_OF_STOCK",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    cartItemStore[cartItemIndex].quantity = quantity;
    return HttpResponse.json(cartItemStore[cartItemIndex]);
  }),
];
