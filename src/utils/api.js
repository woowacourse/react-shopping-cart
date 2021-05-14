const BASE_URL = "https://shopping-cart.techcourse.co.kr";

const productAPI = {
  async fetch() {
    const response = await fetch(`${BASE_URL}/api/products`);

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    return response.json();
  },
};

// eslint-disable-next-line import/prefer-default-export
export { productAPI };
