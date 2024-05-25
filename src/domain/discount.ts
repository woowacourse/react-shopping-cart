import { Coupon } from '@appTypes/orderConfirm';
import { CartItem } from '@appTypes/shoppingCart';

const calculateBOGODiscount = (selectedCartItems: CartItem[]) => {
  const selectedCartItemDiscountPrices = selectedCartItems.map((selectedCartItem) => {
    if (selectedCartItem.quantity >= 3) return selectedCartItem.product.price;

    return 0;
  });

  return Math.max(...selectedCartItemDiscountPrices);
};

export const calculateDiscountAmount = ({
  coupon,
  shippingPrice,
  orderPrice,
  selectedCartItems,
}: {
  coupon: Coupon;
  shippingPrice?: number;
  orderPrice?: number;
  selectedCartItems?: CartItem[];
}) => {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon?.discount ?? 0;
    case 'percentage':
      return Math.floor(((orderPrice ?? 0) * (coupon.discount ?? 0)) / 100);
    case 'buyXgetY':
      if (coupon.code === 'BOGO') return calculateBOGODiscount(selectedCartItems ?? []);
      return 0;
    case 'freeShipping':
      return shippingPrice ?? 0;
    default:
      return 0;
  }
};
