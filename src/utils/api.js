const BASE_URL = "https://shopping-cart.techcourse.co.kr";

const CUSTOMER_NAME = "bigsaigon333";

const productAPI = {
  ENDPOINT: `${BASE_URL}/api/products`,

  process(product) {
    return {
      productId: Number(product.product_id),
      price: Number(product.price),
      name: String(product.name),
      imageURL: String(product.image_url),
    };
  },

  async fetch() {
    const response = await fetch(this.ENDPOINT);

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const list = await response.json();

    return list.map(this.process);
  },

  async fetchByProductId(productId) {
    const response = await fetch(`${this.ENDPOINT}/${productId}`);

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const product = await response.json();

    return this.process(product);
  },
};

const cartAPI = {
  ENDPOINT: `${BASE_URL}/api/customers`,

  // convert array to object keyed by productId
  process(cart) {
    const cartEntries = cart.map((item) => [
      item.product_id,
      {
        cartId: Number(item.cart_id),
        productId: Number(item.product_id),
        price: Number(item.price),
        name: String(item.name),
        imageURL: String(item.image_url),
        checked: true,
        quantity: 1,
      },
    ]);

    return Object.fromEntries(cartEntries);
  },

  async fetch() {
    const response = await fetch(`${this.ENDPOINT}/${CUSTOMER_NAME}/carts`);

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const cart = await response.json();

    return this.process(cart);
  },

  async addToCartByProductId(productId) {
    const response = await fetch(`${this.ENDPOINT}/${CUSTOMER_NAME}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId }),
    });

    if (response.status !== 201) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const [, cartId] = response.headers.get("location").match(/\/([\d]+)$/);

    return Number(cartId);
  },

  async deleteItemByCartId(cartId) {
    const response = await fetch(
      `${this.ENDPOINT}/${CUSTOMER_NAME}/carts/${cartId}`,
      { method: "DELETE" }
    );

    if (response.status !== 204) {
      throw new Error(`Invalid response status: ${response.status}`);
    }
  },
};

const orderAPI = {
  ENDPOINT: `${BASE_URL}/api/customers`,

  process({ order_id: orderId, order_details: orderDetails }) {
    return {
      orderId,
      orderDetails: orderDetails.map((product) => ({
        productId: Number(product.product_id),
        price: Number(product.price),
        name: String(product.name),
        imageURL: String(product.image_url),
        quantity: Number(product.quantity),
      })),
    };
  },

  async fetch() {
    const response = await fetch(`${this.ENDPOINT}/${CUSTOMER_NAME}/orders`);

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }
    const orders = await response.json();

    return orders.map(this.process);
  },

  async fetchByOrderId(orderId) {
    const response = await fetch(
      `${this.ENDPOINT}/${CUSTOMER_NAME}/orders/${orderId}`
    );

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const order = await response.json();

    return this.process(order);
  },

  async orderCartItems(cart) {
    const order = cart.map(({ cartId, quantity }) => ({
      cart_id: Number(cartId),
      quantity,
    }));

    const response = await fetch(`${this.ENDPOINT}/${CUSTOMER_NAME}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.status !== 201) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const [, orderId] = response.headers.get("location").match(/\/([\d]+)$/);

    return this.fetchByOrderId(orderId);
  },
};

export { productAPI, cartAPI, orderAPI };
