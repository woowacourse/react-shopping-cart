import { http, HttpResponse } from "msw";
import { cartItems } from "./data";

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

export const handlers = [getCartItems];
