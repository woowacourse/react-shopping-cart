const productAPI = {
  BASE_URL: 'https://tigers-react-shopping-cart.herokuapp.com',
  PATH: {
    PRODUCTS: 'products',
  },

  async getProducts() {
    const response = await fetch(`${this.BASE_URL}/${this.PATH.PRODUCTS}`);

    if (!response.ok) {
      return new Error('상품 목록을 불러오는 데에 실패하였습니다!');
    }

    const json = await response.json();

    return json;
  },
};

export default productAPI;
