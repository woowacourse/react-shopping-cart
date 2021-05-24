const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const requestProductList = () => fetch(`${BASE_URL}/api/products`);

export { requestProductList };
