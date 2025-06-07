import { http, HttpResponse } from "msw";
import { ResponseCartItem, ResponseProduct } from "../../types/types";

const API_URL = import.meta.env.VITE_BASE_URL;

export const initializeCartItems = (): ResponseCartItem[] => {
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

export const productHandlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
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
];
