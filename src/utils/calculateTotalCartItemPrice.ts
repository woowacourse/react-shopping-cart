import { Cart } from '@/api/cart';

export function calculateTotalCartItemPrice(items: Cart[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}
