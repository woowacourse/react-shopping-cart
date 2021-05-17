import firebase from "firebase";

import db from "../firebase";

import { CartItem, Id, Order, Product, ProductsObject } from "../types";
import { isDefined } from "../util/typeGuard";

const collection = {
  products: db.collection("products"),
  cart: db.collection("cart"),
  orderList: db.collection("orderList"),
};

const api = {
  products: {
    get: async (): Promise<ProductsObject> => {
      const response: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData | (Id & Product)
      > = await collection.products.get();

      const products: ProductsObject = response.docs.reduce(
        (acc: ProductsObject, product) => {
          const productData = product.data();

          acc.products[productData.id] = {
            name: productData.name,
            price: productData.price,
            imageSrc: productData.imageSrc,
          };

          return acc;
        },
        { products: {} }
      );

      return products;
    },
    post: (product: Id & Product) => {
      return collection.products.doc(product.id).set(product);
    },
  },
  cart: {
    get: async () => {
      const response: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData | CartItem
      > = await collection.cart.get();
      const cartItem = response.docs.map((cartItem) => cartItem.data()).filter(isDefined);

      return cartItem;
    },
    post: (cartItem: CartItem) => {
      return collection.cart.doc(cartItem.id).set(cartItem);
    },
    delete: (id: string) => {
      return collection.cart.doc(id).delete();
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
        return collection.orderList.doc(order.id).set(order);
      },
    },
  },
};

export default api;
