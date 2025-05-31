import { httpClient } from '../../../shared/api/httpClient';
import { CartItem } from '../../../shared/types/cart';

interface CartItemsResponse {
  content: CartItem[];
}

export const getCartItems = () => {
  return httpClient.get<CartItemsResponse>('/cart-items');
};
