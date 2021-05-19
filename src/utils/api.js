/* eslint-disable camelcase */
import http from "./http";

const CUSTOMER_NAME = "bigsaigon333";

const productAPI = {
  ENDPOINT: `/api/products`,

  process({ product_id, price, name, image_url }) {
    return {
      productId: Number(product_id),
      price: Number(price),
      name: String(name),
      imageURL: String(image_url),
    };
  },

  async fetch() {
    const list = await http.get(this.ENDPOINT);

    return list.map(this.process);
  },

  async fetchByProductId(productId) {
    const product = await http.get(`${this.ENDPOINT}/${productId}`);

    return this.process(product);
  },
};

const cartAPI = {
  ENDPOINT: `/api/customers/${CUSTOMER_NAME}/carts`,

  // convert array to object keyed by productId
  process(cart) {
    const cartEntries = cart.map(
      ({ product_id, cart_id, price, name, image_url }) => [
        product_id,
        {
          cartId: Number(cart_id),
          productId: Number(product_id),
          price: Number(price),
          name: String(name),
          imageURL: String(image_url),
          checked: true,
          quantity: 1,
        },
      ]
    );

    return Object.fromEntries(cartEntries);
  },

  async fetch() {
    const cart = await http.get(this.ENDPOINT);

    return this.process(cart);
  },

  async addToCartByProductId(productId) {
    return http.post(this.ENDPOINT, {
      body: { product_id: productId },
    });
  },

  async deleteItemByCartId(cartId) {
    http.delete(`${this.ENDPOINT}/${cartId}`);
  },
};

const orderAPI = {
  ENDPOINT: `/api/customers/${CUSTOMER_NAME}/orders`,

  process({ order_id, order_details }) {
    return {
      orderId: order_id,
      orderDetails: order_details.map((product) => ({
        productId: Number(product.product_id),
        price: Number(product.price),
        name: String(product.name),
        imageURL: String(product.image_url),
        quantity: Number(product.quantity),
      })),
    };
  },

  async fetch() {
    const orders = await http.get(this.ENDPOINT);

    return orders.map(this.process);
  },

  async fetchByOrderId(orderId) {
    const order = await http.get(`${this.ENDPOINT}/${orderId}`);

    return this.process(order);
  },

  async orderCartItems(cart) {
    const order = cart.map(({ cartId, quantity }) => ({
      cart_id: cartId,
      quantity,
    }));

    const orderId = await http.post(this.ENDPOINT, {
      body: order,
    });

    return this.fetchByOrderId(orderId);
  },
};

export { productAPI, cartAPI, orderAPI };
