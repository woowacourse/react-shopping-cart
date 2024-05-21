export const API_URL = import.meta.env.VITE_API_URL;
export const USER_ID = import.meta.env.VITE_USER_ID;
export const USER_PASSWORD = import.meta.env.VITE_PASSWORD;

export const ENDPOINT = {
  cartItem: {
    getList: "/cart-items",
    postItem: "/cart-items",
    deleteItem: (id: number) => `/cart-items/${id}`,
    patchItem: (id: number) => `/cart-items/${id}`,
    getItemCount: "/cart-items/counts",
  },
  order: {
    postOrders: "/orders",
  },
  product: {
    getList: "/products",
    postItem: "/products",
    getItem: (id: number) => `/product/${id}`,
    deleteItem: (id: number) => `/product/${id}`,
  },
  coupon: {
    getList: "/coupons",
  },
};
