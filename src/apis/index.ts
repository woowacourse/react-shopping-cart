import db from "../firebase";

import { CartItem, Id, Order, Product } from "../interface";

const products = db.collection("products");
const cart = db.collection("cart");
const orderList = db.collection("orderList");

const api = {
  products: {
    get: () => {
      return products.get();
    },
    post: (product: Id & Product) => {
      products.doc(product.id).set(product);
    },
  },
  cart: {
    get: () => {
      return cart.get();
    },
    post: (cartItem: CartItem) => {
      cart.doc(cartItem.id).set(cartItem);
    },
    delete: () => {},
  },
  order: {
    get: (id: string) => {
      return orderList.doc(id).get();
    },
    post: (order: Order) => {
      orderList.doc(order.id).set(order);
    },
  },
  orderList: {
    get: () => {
      return orderList.get();
    },
  },
};

export default api;
