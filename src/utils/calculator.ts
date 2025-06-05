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

export const calculateCartPrice = (
  cartItems: CartItemsResponse | undefined,
  checkedItems: number[],
): CartSummary => {
  if (!cartItems?.content) {
    return {
      price: 0,
      totalCount: 0,
      shippingFee: 0,
      totalPrice: 0,
      hasItems: false,
    };
  }

  const selectedItems = cartItems.content.filter((item) => checkedItems.includes(item.id));
  const price = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasItems = checkedItems.length > 0;
  const needsShippingFee = price < SHIPPING_FEE_THRESHOLD;
  const shippingFee = hasItems && needsShippingFee ? SHIPPING_FEE : 0;
  const totalPrice = price + shippingFee;

  return {
    price,
    totalCount,
    shippingFee,
    totalPrice,
    hasItems,
  };
};
