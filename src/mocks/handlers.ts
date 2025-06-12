import { http, delay } from "msw";
import { mockCartData, mockCouponData } from "./mockData";

interface CartItemProps {
  productId: number;
  quantity: number;
}

const getRequestURL = (url: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
};

export const handlers = [
  http.get(getRequestURL("/cart-items"), async () => {
    return new Response(JSON.stringify({ content: [...mockCartData] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.patch(getRequestURL("/cart-items/:id"), async ({ params, request }) => {
    const { id } = params;

    const updateItem = (await request.json()) as CartItemProps;
    const { quantity } = updateItem;

    const cartIndex = mockCartData.findIndex(
      (cartItem) => cartItem.id === Number(id)
    );

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({
          errorCode: "NOT_FOUND",
          message: "상품이 존재하지 않습니다.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    mockCartData[cartIndex].quantity = quantity;

    await delay(1500);

    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.delete(getRequestURL("/cart-items/:id"), async ({ params }) => {
    const { id } = params;
    const cartIndex = mockCartData.findIndex(
      (cartItem) => cartItem.id === Number(id)
    );

    if (cartIndex === -1) {
      return new Response(
        JSON.stringify({
          errorCode: "NOT_FOUND",
          message: "상품이 존재하지 않습니다.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    mockCartData.splice(cartIndex, 1);

    await delay(1500);

    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.get(getRequestURL("/coupons"), async () => {
    return new Response(JSON.stringify([...mockCouponData]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
