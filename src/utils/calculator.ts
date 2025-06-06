import { CartProduct } from '../types/cart';

interface CartItemsResponse {
  content: CartProduct[];
}

interface CartSummary {
  price: number;
  totalCount: number;
  shippingFee: number;
  totalPrice: number;
  hasItems: boolean;
}

const SHIPPING_FEE_THRESHOLD = 100000;
const SHIPPING_FEE = 3000;

const getSelectedItems = (
  cartItems: CartItemsResponse | undefined,
  checkedItems: number[],
): CartProduct[] => {
  if (!cartItems?.content) return [];
  return cartItems.content.filter((item) => checkedItems.includes(item.id));
};

const calculateTotalPrice = (selectedItems: CartProduct[]): number => {
  return selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

const calculateTotalCount = (selectedItems: CartProduct[]): number => {
  return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
};

const calculateShippingFee = (price: number, hasItems: boolean): number => {
  const needsShippingFee = price < SHIPPING_FEE_THRESHOLD;
  return hasItems && needsShippingFee ? SHIPPING_FEE : 0;
};

export const calculateCartPrice = (
  cartItems: CartItemsResponse | undefined,
  checkedItems: number[],
): CartSummary => {
  const selectedItems = getSelectedItems(cartItems, checkedItems);
  const price = calculateTotalPrice(selectedItems);
  const totalCount = calculateTotalCount(selectedItems);
  const hasItems = checkedItems.length > 0;
  const shippingFee = calculateShippingFee(price, hasItems);
  const totalPrice = price + shippingFee;

  return {
    price,
    totalCount,
    shippingFee,
    totalPrice,
    hasItems,
  };
};
