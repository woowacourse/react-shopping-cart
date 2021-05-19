import firebase from "firebase";
import axios from "axios";

import db from "../firebase";

import { CartItem, Id, Order, Product, ProductsObject } from "../interface";
import { isDefined } from "../util/typeGuard";
import products from "./productsAPI";

const collection = {
  products: db.collection("products"),
  cart: db.collection("cart"),
  orderList: db.collection("orderList"),
};

axios.defaults.baseURL = "https://shopping-cart.techcourse.co.kr";

const api = {
  products,
  cart: {
    get: async () => {
      const response: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData | CartItem
      > = await collection.cart.get();
      const cartItem = response.docs.map((cartItem) => cartItem.data()).filter(isDefined);

      return cartItem;
    },
    post: (cartItem: CartItem) => {
      collection.cart.doc(cartItem.id).set(cartItem);
    },
    delete: (id: string) => {
      collection.cart.doc(id).delete();
    },
  },
  orderList: {
    get: async () => {
      const response: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData | Order
      > = await collection.orderList.get();

      const orders = response.docs.map((order) => order.data()).filter(isDefined);

      const orderList = { orderList: orders };
      return orderList;
    },
    item: {
      get: (id: string) => {
        return collection.orderList.doc(id).get();
      },
      post: (order: Order) => {
        collection.orderList.doc(order.id).set(order);
      },
    },
  },
};

export default api;
