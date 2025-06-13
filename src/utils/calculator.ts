import { BASE_SHIPPING_FEE, EXTRA_SHIPPING_FEE, SHIPPING_FREE_PRICE } from '../constants/payments';
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

interface ShippingFeeParams {
  price: number;
  hasItems: boolean;
  isExtraShippingFee?: boolean;
  hasFreeShippingCoupon?: boolean;
}

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

export const calculateShippingFee = ({
  price,
  hasItems,
  isExtraShippingFee = false,
  hasFreeShippingCoupon = false,
}: ShippingFeeParams): number => {
  if (!hasItems || price >= SHIPPING_FREE_PRICE) {
    return 0;
  }

  if (hasFreeShippingCoupon) {
    return isExtraShippingFee ? EXTRA_SHIPPING_FEE : BASE_SHIPPING_FEE;
  }

  return isExtraShippingFee ? EXTRA_SHIPPING_FEE : BASE_SHIPPING_FEE;
};

export const calculateCartPrice = (
  cartItems: CartItemsResponse | undefined,
  checkedItems: number[],
): CartSummary => {
  const selectedItems = getSelectedItems(cartItems, checkedItems);
  const price = calculateTotalPrice(selectedItems);
  const totalCount = calculateTotalCount(selectedItems);
  const hasItems = checkedItems.length > 0;
  const shippingFee = calculateShippingFee({ price, hasItems });
  const totalPrice = price + shippingFee;

  return {
    price,
    totalCount,
    shippingFee,
    totalPrice,
    hasItems,
  };
};
