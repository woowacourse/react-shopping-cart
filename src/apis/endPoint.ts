import { API_BASE_URL } from './constants';

const endPoint = {
  cartItems: `${API_BASE_URL}/cart-items`,
  cartItem: (productId: number) => `${API_BASE_URL}/cart-items/${productId}`,
  coupon: `${API_BASE_URL}/coupons`,
  order: `${API_BASE_URL}/orders`,
};

export default endPoint;
