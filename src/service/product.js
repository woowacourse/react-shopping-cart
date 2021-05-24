const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const requestProductList = () => fetch(`${BASE_URL}/api/products`);
const requestProduct = productId => fetch(`${BASE_URL}/api/products/${productId}`);

export { requestProductList, requestProduct };
