import { Order } from "../types";

const BASE_URL = "https://shopping-cart.techcourse.co.kr";

const api = {
  products: {
    get: async (id: string = "") => {
      const response = await fetch(`${BASE_URL}/api/products/${id}`);
      return await response.json();
    },
  },
  cart: {
    get: async () => {
      const response = await fetch(`${BASE_URL}/api/customers/seojihwan/carts`);
      return await response.json();
    },
    post: async (product_id: string) => {
      return await fetch(`${BASE_URL}/api/customers/seojihwan/carts`, {
        method: "POST",
        body: JSON.stringify({ product_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    delete: (cart_id: string) => {
      return fetch(`${BASE_URL}/api/customers/seojihwan/carts/${cart_id}`, {
        method: "DELETE",
      });
    },
  },
  orderList: {
    get: async () => {
      const response = await fetch(`${BASE_URL}/api/customers/seojihwan/orders`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    },
    item: {
      get: async (order_id: string = "") => {
        const response = await fetch(`${BASE_URL}/api/customers/seojihwan/orders/${order_id}`);
        return await response.json();
      },
      post: (order: Order) => {
        return fetch(`${BASE_URL}/api/customers/seojihwan/orders`, {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
};

export default api;
