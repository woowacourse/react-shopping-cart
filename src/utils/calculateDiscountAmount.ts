import { CartItemProps } from '@/types/cartItem';
import { Coupon } from '@/types/coupon';

const calculateDiscountAmount = (
  coupon: Coupon,
  orderTotalPrice: number,
  deliveryPrice: number,
  checkedItems: CartItemProps[],
) => {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount ?? 0;
    case 'percentage':
      return Math.floor((orderTotalPrice * (coupon.discount ?? 0)) / 100);
    case 'freeShipping':
      return deliveryPrice;
    case 'buyXgetY':
      return calculateBuyXgetYDiscount(coupon, checkedItems);
    default:
      return 0;
  }
};

export default calculateDiscountAmount;

const calculateBuyXgetYDiscount = (coupon: Coupon, checkedItems: CartItemProps[]) => {
  const filteredOverBuyQuantity = checkedItems.filter(
    ({ quantity }) => quantity >= coupon.buyQuantity!,
  );

  const maxAmountPerItemPrice = Math.max(
    ...filteredOverBuyQuantity.map(({ product: { price } }) => price),
  );

  return maxAmountPerItemPrice * coupon.getQuantity!;
};
