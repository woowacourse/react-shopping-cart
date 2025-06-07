import { CartItemProps } from '../types/cartItem';

export function isExpired(expirationDate: string): boolean {
  const today = new Date();
  const [y, m, d] = expirationDate.split('-').map(Number);
  return today > new Date(y, m - 1, d);
}

export function isMiracleMorning(): boolean {
  const now = new Date();

  const start = new Date(now);
  start.setHours(4, 0, 0, 0);
  const end = new Date(now);
  end.setHours(7, 0, 0, 0);

  return now >= start && now <= end;
}

export function isMinimumAmount(
  minimumAmount: number,
  subTotal: number
): boolean {
  return subTotal >= minimumAmount;
}

export function isQuantity(cartItems: CartItemProps[]): boolean {
  return cartItems.some((item) => item.quantity >= 2);
}
