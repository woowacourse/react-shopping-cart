import firebase from "firebase";

import db from "../firebase";

import { CartItem, Id, Order, Product, ProductsObject } from "../interface";

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
          const productData: firebase.firestore.DocumentData | (Id & Product) = product.data();

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
    get: () => {
      return collection.cart.get();
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
