import { http, HttpResponse } from "msw";
import { cartItems, products } from "./data";

type PaginatedResponse<T> = {
  content: T[];
};
const paginatedResponse = <T>(items: T[]): PaginatedResponse<T> => {
  return {
    content: items,
  };
};
export const testStateStore = {
  shouldFailCart: false,
  customCartError: null as string | null,
  reset() {
    this.shouldFailCart = false;
    this.customCartError = null;
  },
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CART_URL = `${BASE_URL}/cart-items`;
const getCartItems = http.get(CART_URL, ({}) => {
  const response = {
    content: [...cartItems],
  };
  if (testStateStore.shouldFailCart) {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Cart Item fetch Failed",
    });
  }

  return HttpResponse.json(response);
});

const deleteCartItems = http.delete(`${CART_URL}/:id`, ({ params }) => {
  const { id } = params;
  const index = cartItems.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return new HttpResponse(null, {
      status: 404,
      statusText: "Cart Item Not Found",
    });
  }

  cartItems.splice(index, 1);

  return new HttpResponse(null, { status: 204 });
});

const patchCartItems = http.patch(
  `${CART_URL}/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const index = cartItems.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return new HttpResponse({
        status: 404,
        statusText: "Cart Item Not Found",
      });
    }

    const targetCartItem = cartItems[index];
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
      cartItems.splice(index, 1);
    }

    targetCartItem.quantity = Number(quantity);

    return new HttpResponse(null, { status: 200 });
  }
);

export const handlers = [getCartItems, deleteCartItems, patchCartItems];
