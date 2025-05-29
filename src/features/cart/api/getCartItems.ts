import { httpClient } from '../../../shared/api/httpClient';
import { CartItem } from '../../../shared/type/cart';

interface CartItemsResponse {
  content: CartItem[];
}

export const getCartItems = () => {
  return httpClient.get<CartItemsResponse>('/cart-items');
};
