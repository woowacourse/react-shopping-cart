import { CartItemType, CouponType } from '../types';

interface Args {
  coupon: CouponType;
  items: CartItemType[];
  shippingFee: number;
  totalPrice: number;
}

export const calculateDiscount = ({
  coupon,
  items,
  shippingFee,
  totalPrice,
}: Args) => {
  const { code } = coupon;

  switch (code) {
    case 'FIXED5000':
      return coupon.discount;

    case 'BOGO': {
      const availableItems = items.filter(
        (item) => item.quantity >= coupon.buyQuantity
      );
      return availableItems.reduce((maxPrice, item) => {
        return item.product.price > maxPrice ? item.product.price : maxPrice;
      }, 0);
    }

    case 'FREESHIPPING':
      return shippingFee;

    case 'MIRACLESALE':
      return (totalPrice * coupon.discount) / 100;

    default:
      return 0;
  }
};
