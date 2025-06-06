import { http, HttpResponse } from "msw";
import { cartItems, mockCouponData, products } from "./data";
import { CartItem } from "../type/CartItem";

export const testStateStore = {
  shouldFailCart: false,
  shouldFailCoupons: false,
  mockCartData: cartItems,
  setCartItems(items: CartItem[]) {
    if (
      !Array.isArray(items) ||
      !items.every(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.quantity === "number" &&
          item.product
      )
    ) {
      throw new Error("올바른 형식의 카트 아이템 배열이 아닙니다.");
    }
    this.mockCartData = items;
  },
  reset() {
    this.shouldFailCart = false;
    this.shouldFailCoupons = false;
    this.mockCartData = cartItems;
  },
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CART_URL = `${BASE_URL}/cart-items`;
const getCartItems = http.get(CART_URL, () => {
  const response = {
    content: testStateStore.mockCartData,
  };
  if (testStateStore.shouldFailCart) {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Cart Item fetch Failed",
    });
  }

  return HttpResponse.json(response);
});
const getCoupons = http.get(`${BASE_URL}/coupons`, () => {
  const response = { content: mockCouponData };
  if (testStateStore.shouldFailCoupons) {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Coupons fetch Failed",
    });
  }
  return HttpResponse.json(response);
});

const deleteCartItems = http.delete(`${CART_URL}/:id`, ({ params }) => {
  const { id } = params;
  const index = testStateStore.mockCartData.findIndex((item) => item.id === id);
  if (index === -1) {
    return new HttpResponse(null, {
      status: 404,
      statusText: "Cart Item Not Found",
    });
  }

  testStateStore.mockCartData.splice(index, 1);

  return new HttpResponse(null, { status: 204 });
});

const patchCartItems = http.patch(
  `${CART_URL}/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const index = testStateStore.mockCartData.findIndex(
      (item) => item.id === id
    );

    if (index === -1) {
      return new HttpResponse({
        status: 404,
        statusText: "Cart Item Not Found",
      });
    }

    const targetCartItem = testStateStore.mockCartData[index];
    const targetProductIndex = products.findIndex(
      (product) => product.id === targetCartItem.product.id
    );

    if (targetProductIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Product not found",
      });
    }

    const updatedData = await request.json();
    if (
      !updatedData ||
      typeof updatedData !== "object" ||
      !("quantity" in updatedData)
    ) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Invalid Data",
      });
    }
    const { quantity } = updatedData;
    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Invalid Quantity",
      });
    }

    if (parsedQuantity > targetCartItem.product.quantity) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Insufficient Stock",
      });
    }

    targetCartItem.quantity = parsedQuantity;
    if (parsedQuantity === 0) {
      testStateStore.mockCartData.splice(index, 1);
    }

    return new HttpResponse(null, { status: 200 });
  }
);
const orderCartItems = http.post(`${BASE_URL}/order`, async ({ request }) => {
  const { cartItems } = (await request.json()) as { cartItems: CartItem[] };

  for (const item of cartItems) {
    const qty = Number(item.quantity);
    const product = products.find((p) => p.id === item.product.id);

    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Product Not Found",
      });
    }

    if (product.quantity < qty) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Insufficient Stock",
      });
    }

    console.log(`Ordering ${qty} of ${product.name} (ID: ${product.id})`);
    product.quantity -= qty;
  }

  // 4) 장바구니 비우기
  cartItems.length = 0;

  // 5) 성공 응답
  return new HttpResponse(null, { status: 201 });
});

export const handlers = [
  getCartItems,
  deleteCartItems,
  patchCartItems,
  orderCartItems,
  getCoupons,
];
