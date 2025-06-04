import { http, HttpResponse } from "msw";
import { ResponseProduct, ResponseCartItem } from "../types/types";

const API_URL = import.meta.env.VITE_BASE_URL;

const initializeCartItems = (): ResponseCartItem[] => {
  return Array.from({ length: 4 }, (_, index) => {
    const productId = index + 2;
    return {
      id: productId,
      quantity: (index % 3) + 1,
      product: {
        id: productId,
        name: `장바구니 상품 ${productId}`,
        price: 15000 * ((productId % 3) + 1),
        imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2016.37.43%402x.webp`,
        category: productId % 2 === 0 ? "식료품" : "패션잡화",
        quantity: 50 - (productId % 10),
      },
    };
  });
};

let cartItemStore: ResponseCartItem[] = initializeCartItems();

const createMockProducts = (size: number, page: number): ResponseProduct[] => {
  return Array.from({ length: size }, (_, index) => {
    const id = page * size + index + 1;
    const quantity = id === 1 ? 0 : 50 - (id % 10);
    return {
      id,
      name: `상품 ${id}`,
      price: 10000 * ((id % 5) + 1),
      imageUrl: `https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-21%20at%2016.37.43%402x.webp`,
      category: id % 2 === 0 ? "식료품" : "패션잡화",
      quantity,
    };
  });
};

export const handlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    console.log("MSW가 상품 목록 요청을 가로챘습니다:", request.url);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const size = Number(url.searchParams.get("size") || "20");

    const products = createMockProducts(size, page);

    return HttpResponse.json({
      content: products,
      totalElements: 100,
      totalPages: 5,
      size,
      number: page,
    });
  }),

  http.get(`${API_URL}/cart-items`, ({ request }) => {
    console.log("MSW가 장바구니 목록 요청을 가로챘습니다:", request.url);

    return HttpResponse.json({
      content: cartItemStore,
      totalElements: cartItemStore.length,
      totalPages: 1,
      size: cartItemStore.length,
      number: 0,
    });
  }),

  http.post(`${API_URL}/cart-items`, async ({ request }) => {
    console.log("MSW가 장바구니 추가 요청을 가로챘습니다:", request.url);

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
    console.log("MSW가 장바구니 삭제 요청을 가로챘습니다:", params.id);

    const cartItemId = Number(params.id);
    cartItemStore = cartItemStore.filter((item) => item.id !== cartItemId);

    return HttpResponse.json({}, { status: 204 });
  }),

  http.patch(`${API_URL}/cart-items/:id`, async ({ params, request }) => {
    console.log("MSW가 장바구니 수정 요청을 가로챴습니다:", params.id);

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
