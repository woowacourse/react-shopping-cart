import firebase from "firebase";

import db from "../firebase";

import { CartItem, Id, Order, Product, ProductsObject } from "../interface";
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
      collection.products.doc(product.id).set(product);
    },
  },
  cart: {
    get: async () => {
      const response: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | CartItem> = await collection.cart.get();
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
  order: {
    get: (id: string) => {
      return collection.orderList.doc(id).get();
    },
    post: (order: Order) => {
      collection.orderList.doc(order.id).set(order);
    },
  },
  orderList: {
    get: () => {
      return collection.orderList.get();
    },
  },
};

export default api;
